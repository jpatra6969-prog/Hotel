"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface CanvasPreloaderHandle {
  /** Directly render a specific frame to the canvas (1-indexed) at 60/120fps without React re-renders */
  renderFrame: (index: number) => void;
  /** Get a cached image element */
  getCachedFrame: (index: number) => HTMLImageElement | null;
  /** Returns true if initial 150 frames are ready */
  isInitialReady: () => boolean;
  /** Returns true if all frames are ready */
  isAllReady: () => boolean;
}

export interface CanvasPreloaderProps {
  /** Total number of frames in sequence (default: 865) */
  totalFrames?: number;
  /** Number of initial frames required before unlocking UI (default: 150) */
  initialFramesCount?: number;
  /** Directory containing frame images (default: "/frames") */
  framesDir?: string;
  /** File prefix for each frame (default: "frame_") */
  framePrefix?: string;
  /** File extension (default: ".jpg") */
  frameExtension?: string;
  /** Number of digits for index padding (default: 4 for "0001") */
  padLength?: number;
  /** Concurrency limit for background image prefetching (default: 6) */
  backgroundConcurrency?: number;
  /** Callback invoked as soon as the first 150 frames are fully ready */
  onInitialLoadComplete?: (cachedFrames: (HTMLImageElement | null)[]) => void;
  /** Callback invoked when all frames (1..totalFrames) are cached */
  onAllFramesLoaded?: (cachedFrames: (HTMLImageElement | null)[]) => void;
  /** Callback reporting initial preloading progress (0 - 100) */
  onProgress?: (percent: number, loaded: number, total: number) => void;
  /** Optional prop-driven frame index (1-indexed). Can also use ref.current.renderFrame(frame) */
  currentFrame?: number;
  /** Luxury title displayed in the preloader */
  title?: string;
  /** Subtitle displayed in the preloader */
  subtitle?: string;
  /** Additional CSS classes for canvas container */
  className?: string;
}

const CanvasPreloader = forwardRef<CanvasPreloaderHandle, CanvasPreloaderProps>(
  (
    {
      totalFrames = 865,
      initialFramesCount = 150,
      framesDir = "/frames",
      framePrefix = "frame_",
      frameExtension = ".jpg",
      padLength = 4,
      backgroundConcurrency = 6,
      onInitialLoadComplete,
      onAllFramesLoaded,
      onProgress,
      currentFrame,
      title = "VILLA SANCTUARY",
      subtitle = "EXPERIENCE THE RETREAT",
      className = "",
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Array storing all preloaded HTMLImageElements (1-indexed, index 0 is null)
    const cachedFramesRef = useRef<(HTMLImageElement | null)[]>([]);

    // Stable references to callbacks
    const onInitialLoadCompleteRef = useRef(onInitialLoadComplete);
    const onAllFramesLoadedRef = useRef(onAllFramesLoaded);
    const onProgressRef = useRef(onProgress);

    useEffect(() => {
      onInitialLoadCompleteRef.current = onInitialLoadComplete;
      onAllFramesLoadedRef.current = onAllFramesLoaded;
      onProgressRef.current = onProgress;
    });

    // Loading states
    const [initialLoadedCount, setInitialLoadedCount] = useState<number>(0);
    const [isInitialReady, setIsInitialReady] = useState<boolean>(false);
    const [isOverlayHidden, setIsOverlayHidden] = useState<boolean>(false);

    // Background loading state
    const [totalLoadedCount, setTotalLoadedCount] = useState<number>(0);
    const [isAllReady, setIsAllReady] = useState<boolean>(false);

    const isInitialReadyRef = useRef<boolean>(false);
    const isAllReadyRef = useRef<boolean>(false);
    const currentFrameRef = useRef<number>(1);

    // Helper to format frame path
    const getFrameUrl = useCallback(
      (index: number) => {
        const cleanDir = framesDir.replace(/^\/public(\/|$)/, "/");
        const paddedIndex = String(index).padStart(padLength, "0");
        return `${cleanDir.replace(/\/$/, "")}/${framePrefix}${paddedIndex}${frameExtension}`;
      },
      [framesDir, framePrefix, padLength, frameExtension]
    );

    // Function to render a specific frame onto the canvas with crisp aspect-fit (cover)
    const renderFrame = useCallback((frameIndex: number) => {
      currentFrameRef.current = frameIndex;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = cachedFramesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const displayWidth = rect.width;
      const displayHeight = rect.height;

      // Maintain device pixel ratio for sharp rendering on Retina displays
      const requiredWidth = Math.round(displayWidth * dpr);
      const requiredHeight = Math.round(displayHeight * dpr);

      if (canvas.width !== requiredWidth || canvas.height !== requiredHeight) {
        canvas.width = requiredWidth;
        canvas.height = requiredHeight;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Cover math: preserve aspect ratio, fill entire container
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = displayWidth / displayHeight;

      let drawWidth = displayWidth;
      let drawHeight = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        drawWidth = displayWidth;
        drawHeight = displayWidth / imgAspect;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        drawHeight = displayHeight;
        drawWidth = displayHeight * imgAspect;
        offsetX = (displayWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    }, []);

    // Expose imperative handle for 120fps scroll scrubbing
    useImperativeHandle(
      ref,
      () => ({
        renderFrame,
        getCachedFrame: (index: number) => cachedFramesRef.current[index] || null,
        isInitialReady: () => isInitialReadyRef.current,
        isAllReady: () => isAllReadyRef.current,
      }),
      [renderFrame]
    );

    // Update canvas when external currentFrame prop changes
    useEffect(() => {
      if (typeof currentFrame === "number" && currentFrame >= 1 && currentFrame <= totalFrames) {
        renderFrame(currentFrame);
      }
    }, [currentFrame, totalFrames, renderFrame]);

    // Window resize listener
    useEffect(() => {
      const handleResize = () => {
        renderFrame(currentFrameRef.current);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [renderFrame]);

    // 1. Initial 150 Frames Preloader with RAF batching
    useEffect(() => {
      let isCancelled = false;
      const targetCount = Math.min(initialFramesCount, totalFrames);
      let loadedCounter = 0;
      let rafId: number | null = null;

      // Initialize array capacity
      if (cachedFramesRef.current.length <= totalFrames) {
        cachedFramesRef.current = new Array(totalFrames + 1).fill(null);
      }

      const scheduleProgressUpdate = () => {
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            rafId = null;
            if (isCancelled) return;
            setInitialLoadedCount(loadedCounter);
            setTotalLoadedCount(loadedCounter);

            const pct = Math.min(100, Math.round((loadedCounter / targetCount) * 100));
            onProgressRef.current?.(pct, loadedCounter, targetCount);
          });
        }
      };

      const onSingleFrameLoaded = (index: number, img: HTMLImageElement) => {
        if (isCancelled) return;
        cachedFramesRef.current[index] = img;
        loadedCounter += 1;

        scheduleProgressUpdate();

        // Render frame 1 immediately when ready for an instant visual preview
        if (index === 1 || loadedCounter === 1) {
          renderFrame(1);
        }

        // Check if all initial frames finished loading
        if (loadedCounter >= targetCount && !isInitialReadyRef.current) {
          isInitialReadyRef.current = true;
          setIsInitialReady(true);
          onInitialLoadCompleteRef.current?.(cachedFramesRef.current);

          // Gracefully hide preloader overlay after a brief smooth reveal
          setTimeout(() => {
            if (!isCancelled) {
              setIsOverlayHidden(true);
            }
          }, 650);
        }
      };

      // Load initial 150 frames in parallel
      for (let i = 1; i <= targetCount; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = getFrameUrl(i);

        img.onload = () => onSingleFrameLoaded(i, img);
        img.onerror = () => {
          console.warn(`[CanvasPreloader] Failed to load frame ${i}`);
          onSingleFrameLoaded(i, img);
        };
      }

      return () => {
        isCancelled = true;
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }, [initialFramesCount, totalFrames, getFrameUrl, renderFrame]);

    // 2. Background Preloading for Remaining Frames (151 .. totalFrames)
    useEffect(() => {
      if (!isInitialReady) return;

      let isCancelled = false;
      const startIndex = initialFramesCount + 1;
      const endIndex = totalFrames;

      if (startIndex > endIndex) {
        isAllReadyRef.current = true;
        setIsAllReady(true);
        onAllFramesLoadedRef.current?.(cachedFramesRef.current);
        return;
      }

      let nextIndex = startIndex;
      let activeRequests = 0;
      let completedBackground = 0;
      const totalRemaining = endIndex - startIndex + 1;
      let rafBatchId: number | null = null;

      const scheduleBatchUpdate = () => {
        if (rafBatchId === null) {
          rafBatchId = requestAnimationFrame(() => {
            rafBatchId = null;
            if (isCancelled) return;
            setTotalLoadedCount(initialFramesCount + completedBackground);
          });
        }
      };

      const pumpQueue = () => {
        if (isCancelled) return;

        while (activeRequests < backgroundConcurrency && nextIndex <= endIndex) {
          const frameIdx = nextIndex++;
          activeRequests++;

          const img = new Image();
          img.decoding = "async";
          img.src = getFrameUrl(frameIdx);

          const handleDone = () => {
            if (isCancelled) return;
            cachedFramesRef.current[frameIdx] = img;
            activeRequests--;
            completedBackground++;

            scheduleBatchUpdate();

            if (completedBackground >= totalRemaining && !isAllReadyRef.current) {
              isAllReadyRef.current = true;
              setIsAllReady(true);
              onAllFramesLoadedRef.current?.(cachedFramesRef.current);
            } else {
              // Schedule next image pump during browser idle time to prevent any UI interference
              if (typeof window !== "undefined" && "requestIdleCallback" in window) {
                (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
                  pumpQueue();
                });
              } else {
                setTimeout(pumpQueue, 4);
              }
            }
          };

          img.onload = handleDone;
          img.onerror = () => {
            console.warn(`[CanvasPreloader] Failed background frame ${frameIdx}`);
            handleDone();
          };
        }
      };

      pumpQueue();

      return () => {
        isCancelled = true;
        if (rafBatchId !== null) cancelAnimationFrame(rafBatchId);
      };
    }, [isInitialReady, initialFramesCount, totalFrames, backgroundConcurrency, getFrameUrl]);

    // Derived progress percentages
    const initialPercentage = Math.min(
      100,
      Math.round((initialLoadedCount / Math.max(1, initialFramesCount)) * 100)
    );
    const totalPercentage = Math.min(
      100,
      Math.round((totalLoadedCount / Math.max(1, totalFrames)) * 100)
    );

    return (
      <div className={`relative w-full h-full overflow-hidden bg-black select-none ${className}`}>
        {/* HTML5 Canvas for image sequence rendering */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover transform-gpu"
          style={{ willChange: "transform" }}
        />

      </div>
    );
  }
);

CanvasPreloader.displayName = "CanvasPreloader";

export default CanvasPreloader;
