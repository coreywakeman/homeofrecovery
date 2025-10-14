import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, User, LogOut } from "lucide-react";
import logoWalnut from "@/assets/logo-walnut.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect admins to dashboard only from auth page
  useEffect(() => {
    if (user && isAdmin && window.location.pathname === '/auth') {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Memberships", href: "#memberships" },
    { name: "Packs", href: "#packs" },
    { name: "Group Bookings", href: "#group-bookings" },
  ];

  const handleMembersClick = () => {
    navigate('/members');
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logoWalnut} 
              alt="Home of Recovery" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            {user && !isAdmin ? (
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={handleMembersClick}>
                  Members Hub
                </Button>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : !user ? (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Button className="btn-wellness">Book Session</Button>
              </div>
            ) : null}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {user && !isAdmin ? (
                <div className="px-3 py-2 space-y-2">
                  <Button variant="outline" onClick={handleMembersClick} className="w-full">
                    Members Hub
                  </Button>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : !user ? (
                <div className="px-3 py-2 space-y-2">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Button className="btn-wellness w-full">Book Session</Button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
