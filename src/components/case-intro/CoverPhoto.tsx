interface CoverPhotoProps {
  src: string;
  alt: string;
  caption: string;
}

export default function CoverPhoto({ src, alt, caption }: CoverPhotoProps) {
  return (
    <div className="h-max bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-3 rotate-[-1.5deg] max-w-xs mx-auto lg:mx-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-80 object-cover rounded-[var(--radius-sm)]"
      />
      <p className="text-center text-xs text-[var(--ink-muted)] mt-3 font-heading italic">
        {caption}
      </p>
    </div>
  );
}