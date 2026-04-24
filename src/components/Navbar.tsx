import { Link, useLocation, useNavigate } from "react-router-dom";
import { Hand, BookOpen, Camera, BarChart3, Menu, X, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Home", icon: Hand },
  { path: "/alphabet", label: "Alphabet", icon: BookOpen },
  { path: "/lessons", label: "Lessons", icon: BookOpen },
  { path: "/translator", label: "Translator", icon: Camera },
  { path: "/progress", label: "Progress", icon: BarChart3 },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userName");
      setUserName(token ? name : null);
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("auth-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth-changed", sync);
    };
  }, [location.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("auth-changed"));
    setUserName(null);
    navigate("/");
  };

  const isAuthed = !!userName;
  const initial = userName?.trim()?.charAt(0)?.toUpperCase() ?? "";

  return (
    <nav className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="w-9 h-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-elevated">
            <Hand className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-gradient-hero">SignLingo</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-secondary rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}

          {isAuthed ? (
            <div className="ml-2 flex items-center gap-2">
              <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-secondary/70 border border-border">
                <div className="w-7 h-7 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {initial || <UserIcon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                  {userName}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4 mr-1.5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="ml-2 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gradient-hero px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 shadow-elevated"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden overflow-hidden border-b border-border bg-card"
        >
          <div className="p-4 flex flex-col gap-1">
            {isAuthed && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/60 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {initial}
                </div>
                <div className="text-sm font-semibold text-foreground truncate">{userName}</div>
              </div>
            )}

            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}

            {isAuthed ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-hero text-primary-foreground"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
