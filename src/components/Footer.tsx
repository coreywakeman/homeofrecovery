import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { name: "Services", href: "/services", isAnchor: false },
    { name: "Memberships", href: "/memberships", isAnchor: false },
    { name: "Group Bookings", href: "/group-bookings", isAnchor: false },
    { name: "Contact", href: "/contact", isAnchor: false },
  ];

  return (
    <footer className="bg-walnut text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-cream mb-4">
              Home of Recovery
            </h3>
            <p className="text-cream/80 leading-relaxed mb-6">
              Dubbo's first dedicated recovery and wellness facility, designed to support both physical and mental wellbeing through industry-leading recovery services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/60 hover:text-mid-taupe transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-mid-taupe transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-mid-taupe transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-cream">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-cream/80 hover:text-mid-taupe transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-cream">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-mid-taupe mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@homeofrecovery.au" className="text-cream/80 hover:text-mid-taupe transition-colors">
                  info@homeofrecovery.au
                </a>
              </div>
              <p className="text-sm text-cream/70">
                Located in Dubbo, NSW
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm mb-4 md:mb-0">
            © 2024 Home of Recovery. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy-policy" className="text-cream/60 hover:text-mid-taupe transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-cream/60 hover:text-mid-taupe transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
