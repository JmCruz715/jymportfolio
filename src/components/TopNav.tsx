import { Home, User, Menu as MenuIcon, Moon, Sun } from "lucide-react";

interface Props {
  onHome: () => void;
  onProfile: () => void;
  onMenu: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const TopNav = ({ onHome, onProfile, onMenu, isDark, onToggleTheme }: Props) => {
  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,440px)]">
      <div className="smooth-card flex items-center justify-between px-2 py-1.5">
        <div className="flex items-center gap-1">
          <button onClick={onHome} className="smooth-btn" aria-label="Home">
            <Home className="w-4 h-4" />
            <span className="hidden xs:inline text-xs font-semibold">Home</span>
          </button>
          <button onClick={onProfile} className="smooth-btn" aria-label="Profile">
            <User className="w-4 h-4" />
            <span className="hidden xs:inline text-xs font-semibold">Profile</span>
          </button>
          <button onClick={onMenu} className="smooth-btn" aria-label="Menu">
            <MenuIcon className="w-4 h-4" />
            <span className="hidden xs:inline text-xs font-semibold">Menu</span>
          </button>
        </div>
        <button
          onClick={onToggleTheme}
          className="smooth-btn !px-2"
          aria-label="Toggle theme"
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default TopNav;
