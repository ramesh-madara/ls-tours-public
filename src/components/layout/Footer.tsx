import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TripAdvisorIcon } from '@/components/ui/TripAdvisorIcon';
import lsToursLogo from '@/assets/ls-tours-logo.png';
import { scrollToTopSmooth } from '@/lib/scrollUtils';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Tour Packages' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Get a Quote' },
];

// Only 5 destinations - Mirissa removed
const destinations = [
  { slug: 'sigiriya', label: 'Sigiriya' },
  { slug: 'ella', label: 'Ella' },
  { slug: 'kandy', label: 'Kandy' },
  { slug: 'galle', label: 'Galle' },
  { slug: 'yala', label: 'Yala' },
];

const socials = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  { href: 'https://tripadvisor.com', icon: TripAdvisorIcon, label: 'TripAdvisor' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleQuickLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href);
    scrollToTopSmooth();
  };

  const handleDestinationClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    // Navigate to destinations page with state to open the sidebar
    // Do NOT scroll to top - preserve scroll position
    navigate('/destinations', { 
      state: { openDestinationSlug: slug, preserveScroll: true } 
    });
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container py-12 lg:py-16">
        {/* Brand Section - Always full width on top for mobile */}
        <div className="mb-10 lg:mb-0 lg:hidden">
          <Link to="/" onClick={(e) => handleQuickLinkClick(e, '/')} className="inline-flex items-center gap-3">
            <img src={lsToursLogo} alt="LS Tours" className="h-16 w-auto" />
          </Link>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xs mt-4">
            LS Tours — curated Sri Lanka journeys, from beaches to hill country.
          </p>
        </div>

        {/* Desktop: 5-column grid | Mobile: 2-column rows */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* 1. Brand Column - Hidden on mobile (shown above), visible on desktop */}
          <div className="hidden lg:block space-y-5">
            <Link to="/" onClick={(e) => handleQuickLinkClick(e, '/')} className="inline-flex items-center gap-3">
              <img src={lsToursLogo} alt="LS Tours" className="h-16 w-auto" />
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs">
              LS Tours — curated Sri Lanka journeys, from beaches to hill country.
            </p>
          </div>

          {/* 2. Quick Links - Mobile Row 1, Col 1 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleQuickLinkClick(e, link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Top Destinations - Mobile Row 1, Col 2 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Top Destinations</h4>
            <ul className="space-y-2.5">
              {destinations.map((dest) => (
                <li key={dest.slug}>
                  <a
                    href={`/destinations#${dest.slug}`}
                    onClick={(e) => handleDestinationClick(e, dest.slug)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {dest.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact - Mobile Row 2, Col 1 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+94771234567"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+94 77 123 4567</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@lstours.lk"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>hello@lstours.lk</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </li>
            </ul>

            <Button
              asChild
              size="sm"
              className="mt-5 gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white w-full sm:w-auto"
            >
              <a
                href="https://wa.me/94781229308"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* 5. Social Links - Mobile Row 2, Col 2 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Social</h4>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {currentYear} LS Tours. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/94781229308"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3.5 shadow-lg hover:scale-110 transition-transform"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </footer>
  );
};
