import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggleMobileNav, closeMobileNav } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import lsToursLogo from '@/assets/ls-tours-logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const mobileNavOpen = useAppSelector((state) => state.ui.mobileNavOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(closeMobileNav());
  }, [location.pathname, dispatch]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+94771234567" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-4 w-4" />
              +94 77 123 4567
            </a>
            <a href="mailto:hello@lstours.lk" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="h-4 w-4" />
              hello@lstours.lk
            </a>
          </div>
          <p>Discover the Pearl of the Indian Ocean</p>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-md'
            : 'bg-background/80 backdrop-blur-sm'
        )}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src={lsToursLogo} 
                alt="LS Tours" 
                className="h-12 lg:h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button asChild className="hidden md:inline-flex">
                <Link to="/contact">Get a Quote</Link>
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => dispatch(toggleMobileNav())}
                aria-label="Toggle menu"
              >
                {mobileNavOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-background z-40 lg:hidden shadow-2xl"
          >
            <div className="pt-20 px-6">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'block py-3 px-4 rounded-lg text-lg font-medium transition-colors',
                        isActive(link.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
                
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <a href="tel:+94771234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    +94 77 123 4567
                  </a>
                  <a href="mailto:hello@lstours.lk" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    hello@lstours.lk
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeMobileNav())}
            className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
