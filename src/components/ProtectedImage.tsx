type ProtectedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  className,
}: ProtectedImageProps) {
  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        draggable="false"
        loading="lazy"
        decoding="async"
        className={className}
      />
      <div className="absolute top-0 left-0 size-full z-1 bg-transparent"></div>
    </div>
  );
}
