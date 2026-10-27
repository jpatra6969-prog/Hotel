import React from "react";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  size?: number | string;
  className?: string;
}

/**
 * Universal Flaticon UIcons font renderer
 */
export function Flaticon({
  name,
  size = 18,
  className = "",
  style,
  ...props
}: IconProps & { name: string }) {
  const iconClass = name.startsWith("fi-") ? name : `fi-rr-${name}`;
  return (
    <i
      className={`fi ${iconClass} ${className} inline-flex items-center justify-center align-middle`}
      style={{
        fontSize: typeof size === "number" ? `${size}px` : size,
        lineHeight: 1,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function CalendarIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-calendar" size={size} className={className} {...props} />;
}

export function UsersIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-users" size={size} className={className} {...props} />;
}

export function MapPinIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-marker" size={size} className={className} {...props} />;
}

export function StarIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-sr-star" size={size} className={className} {...props} />;
}

export function ShieldCheckIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-shield-check" size={size} className={className} {...props} />;
}

export function BedIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-bed" size={size} className={className} {...props} />;
}

export function BathIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-bath" size={size} className={className} {...props} />;
}

export function MaximizeIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-expand" size={size} className={className} {...props} />;
}

export function ChevronDownIcon({ size = 14, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-angle-small-down" size={size} className={className} {...props} />;
}

export function ChevronRightIcon({ size = 14, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-angle-small-right" size={size} className={className} {...props} />;
}

export function CheckIcon({ size = 14, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-check" size={size} className={className} {...props} />;
}

export function CloseIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-cross" size={size} className={className} {...props} />;
}

export function SparklesIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-sparkles" size={size} className={className} {...props} />;
}

export function PlayIcon({ size = 14, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-sr-play" size={size} className={className} {...props} />;
}

export function PauseIcon({ size = 14, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-sr-pause" size={size} className={className} {...props} />;
}

export function VolumeIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-volume" size={size} className={className} {...props} />;
}

export function VolumeMuteIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-volume-mute" size={size} className={className} {...props} />;
}

export function AwardIcon({ size = 18, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-award" size={size} className={className} {...props} />;
}

export function PhoneIcon({ size = 14, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-phone-call" size={size} className={className} {...props} />;
}

export function WineIcon({ size = 16, className = "", ...props }: IconProps) {
  return <Flaticon name="fi-rr-wine-glass" size={size} className={className} {...props} />;
}
