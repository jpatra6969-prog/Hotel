/**
 * Generates an organic, calming Mediterranean coastal ambient soundscape
 * (gentle ocean swell and distant harmonic chime) entirely in real-time
 * via Web Audio API. Zero external audio files required.
 */
class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private chimeTimer: NodeJS.Timeout | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    this.masterGain.connect(this.ctx.destination);

    // 1. Generate 5 seconds of pink noise for gentle rolling sea waves
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = buffer;
    this.noiseNode.loop = true;

    // Filter simulating ocean swell
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(280, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO modulating filter for rolling waves (period ~8s)
    this.lfoNode = this.ctx.createOscillator();
    this.lfoNode.type = "sine";
    this.lfoNode.frequency.setValueAtTime(0.125, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

    this.lfoNode.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);

    this.noiseNode.start();
    this.lfoNode.start();
    this.isPlaying = true;

    // Periodically play a subtle harmonic chime chord (peaceful bell resonance)
    this.scheduleChimes();
  }

  private scheduleChimes() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const playChime = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C Major Pentatonic harmony
      const freq = notes[Math.floor(Math.random() * notes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 5);

      const nextInterval = 8000 + Math.random() * 8000;
      this.chimeTimer = setTimeout(playChime, nextInterval);
    };

    this.chimeTimer = setTimeout(playChime, 4000);
  }

  public pause() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);

    setTimeout(() => {
      if (this.noiseNode) {
        try { this.noiseNode.stop(); } catch {}
        this.noiseNode.disconnect();
      }
      if (this.lfoNode) {
        try { this.lfoNode.stop(); } catch {}
        this.lfoNode.disconnect();
      }
      if (this.chimeTimer) {
        clearTimeout(this.chimeTimer);
      }
      this.isPlaying = false;
    }, 1300);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundscape();
