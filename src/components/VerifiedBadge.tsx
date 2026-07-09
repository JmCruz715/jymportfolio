interface Props {
  size?: number;
  className?: string;
}

// Realistic Meta-style scalloped verified badge
const VerifiedBadge = ({ size = 20, className = "" }: Props) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    aria-label="Verified"
    role="img"
  >
    <defs>
      <linearGradient id="vb-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4599FF" />
        <stop offset="55%" stopColor="#1877F2" />
        <stop offset="100%" stopColor="#0866FF" />
      </linearGradient>
      <radialGradient id="vb-shine" cx="0.35" cy="0.25" r="0.6">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <filter id="vb-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0.6" stdDeviation="0.7" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* 12-point scalloped star */}
    <path
      filter="url(#vb-shadow)"
      fill="url(#vb-grad)"
      d="M12 1.2 14.2 3.1 17 2.5 17.9 5.2 20.6 6.1 20 8.9 21.9 11 20 13.1 20.6 15.9 17.9 16.8 17 19.5 14.2 18.9 12 20.8 9.8 18.9 7 19.5 6.1 16.8 3.4 15.9 4 13.1 2.1 11 4 8.9 3.4 6.1 6.1 5.2 7 2.5 9.8 3.1Z"
    />
    <path
      fill="url(#vb-shine)"
      d="M12 1.2 14.2 3.1 17 2.5 17.9 5.2 20.6 6.1 20 8.9 21.9 11 20 13.1 20.6 15.9 17.9 16.8 17 19.5 14.2 18.9 12 20.8 9.8 18.9 7 19.5 6.1 16.8 3.4 15.9 4 13.1 2.1 11 4 8.9 3.4 6.1 6.1 5.2 7 2.5 9.8 3.1Z"
    />
    <path
      d="M8 11.6 10.8 14.3 16.2 8.9"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VerifiedBadge;
