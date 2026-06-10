/**
 * AI Act Navigator logo: a compass-rose mark (amber north needle) + the
 * "AI Act Navigator" wordmark in the display font (Spectral). The
 * navigation/wayfinding metaphor, indigo + amber signal.
 */

const SIZES = {
  sm: { mark: 24, text: 'text-base' },
  md: { mark: 30, text: 'text-lg' },
  lg: { mark: 40, text: 'text-2xl' }
} as const;

export function CompassMark({
  size = 30,
  tone = 'light'
}: {
  size?: number;
  tone?: 'light' | 'dark';
}) {
  // tone 'light' = on a light surface (indigo/ink strokes); 'dark' = on a dark surface (paper strokes)
  const ring = tone === 'dark' ? '#FAFAFD' : '#1E1B4B';
  const needleSouth = tone === 'dark' ? 'rgba(250,250,253,0.55)' : '#3730A3';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="24" cy="24" r="21" stroke={ring} strokeWidth="2" opacity="0.85" />
      <circle cx="24" cy="24" r="14" stroke={ring} strokeWidth="1" opacity="0.4" />
      {/* North needle in amber */}
      <path d="M24 4 L29 24 L24 22 L19 24 Z" fill="#E0A100" />
      {/* South needle */}
      <path d="M24 44 L29 24 L24 26 L19 24 Z" fill={needleSouth} />
      {/* East / West subtle */}
      <path d="M44 24 L24 29 L26 24 L24 19 Z" fill={ring} opacity="0.45" />
      <path d="M4 24 L24 29 L22 24 L24 19 Z" fill={ring} opacity="0.45" />
      <circle cx="24" cy="24" r="2.4" fill="#E0A100" />
    </svg>
  );
}

export function Logo({
  tone = 'light',
  size = 'md'
}: {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}) {
  const s = SIZES[size];
  const textColor = tone === 'dark' ? 'text-paper' : 'text-ink';
  return (
    <span className="inline-flex items-center gap-2.5">
      <CompassMark size={s.mark} tone={tone} />
      <span className={`font-display font-semibold tracking-tight ${s.text} ${textColor}`}>
        AI Act Navigator
      </span>
    </span>
  );
}
