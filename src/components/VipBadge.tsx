interface Props {
  size?: number;
  className?: string;
}

// 3D-styled VIP badge shown before the verified badge
const VipBadge = ({ size = 20, className = "" }: Props) => (
  <span
    className={`vip-3d inline-flex items-center justify-center shrink-0 ${className}`}
    style={{ height: size, paddingInline: size * 0.28, fontSize: size * 0.5 }}
    aria-label="VIP"
    title="VIP"
  >
    VIP
  </span>
);

export default VipBadge;
