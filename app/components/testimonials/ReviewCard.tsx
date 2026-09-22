export function ReviewCard({
  name,
  quote,
  when,
  index,
  className = "mb-6 break-inside-avoid-column",
  quoteClassName,
}: {
  name: string;
  quote: string;
  when: string;
  index: number;
  className?: string;
  quoteClassName?: string;
}) {
  const accents = [
    "from-brand-blue to-brand-cyan",
    "from-brand-navy to-brand-blue",
    "from-brand-cyan to-brand-sky",
  ] as const;
  const accent = accents[index % accents.length];

  return (
    <div
      className={`rounded-3xl border border-brand-line bg-white p-6 shadow-sm shadow-brand-navy/5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-sm font-bold text-white`}
          >
            {name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-brand-navy">{name}</p>
            <p className="truncate text-xs text-brand-ink/55">Posted on Google</p>
          </div>
        </div>
        <GoogleGIcon className="h-4 w-4 shrink-0 text-brand-ink/25" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, si) => (
            <StarIcon key={si} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-ink/45">
          {when}
        </span>
      </div>
      <p
        className={`mt-3 whitespace-pre-line text-sm leading-relaxed text-brand-ink/75 ${quoteClassName ?? ""}`}
      >
        {quote}
      </p>
    </div>
  );
}

export function StarRow({
  label = "5 out of 5 stars",
  className = "h-5 w-5",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={`${className} fill-amber-400 text-amber-400`} />
      ))}
    </div>
  );
}

export function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2.5 15 9l7 .8-5.2 4.6L18.3 22 12 18.4 5.7 22 7.2 14.4 2 9.8 9 9Z" />
    </svg>
  );
}

export function GoogleGIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 4a8 8 0 1 0 7.7 10H12v-3.5h9.5A9.5 9.5 0 1 1 12 2.5c2.3 0 4.4.8 6 2.2l-2.4 2.4A5 5 0 0 0 12 6a6 6 0 0 0 0 12 5.6 5.6 0 0 0 5.4-4H12V4Z"
        fill="currentColor"
      />
    </svg>
  );
}
