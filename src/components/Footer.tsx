import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const locations = [
    {
      name: "Downtown Studio",
      address: "123 Wellness Ave, Downtown",
      phone: "(555) 123-4567"
    },
    {
      name: "Westside Center", 
      address: "456 Recovery Blvd, Westside",
      phone: "(555) 234-5678"
    },
    {
      name: "Northside Clinic",
      address: "789 Healing St, Northside", 
      phone: "(555) 345-6789"
    }
  ];

  const quickLinks = [
    "Class Schedule",
    "Book Appointment", 
    "Membership Plans",
    "Coach Profiles",
    "About Us",
    "Contact"
  ];

  const resources = [
    "Recovery Blog",
    "Wellness Tips",
    "Member Portal",
    "Insurance Info",
    "Privacy Policy",
    "Terms of Service"
  ];

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl font-bold mb-4 text-cream">
              Home of Recovery
            </h3>
            <p className="text-cream/80 leading-relaxed mb-6">
              Dedicated to your complete wellness journey through expert guidance, 
              supportive community, and holistic healing practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream/60 hover:text-coral transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-coral transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-cream/60 hover:text-coral transition-colors">
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
                <li key={link}>
                  <a href="#" className="text-cream/80 hover:text-coral transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-cream">
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource}>
                  <a href="#" className="text-cream/80 hover:text-coral transition-colors">
                    {resource}
                  </a>
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
                <Mail className="w-5 h-5 text-coral mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@homeofrecovery.com" className="text-cream/80 hover:text-coral transition-colors">
                  hello@homeofrecovery.com
                </a>
              </div>
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-coral mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-cream/80">(555) 123-HEAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="border-t border-cream/20 pt-8 mb-8">
          <h4 className="font-heading text-lg font-semibold mb-6 text-cream text-center">
            Our Locations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div key={location.name} className="text-center">
                <h5 className="font-medium text-cream mb-2">{location.name}</h5>
                <div className="flex items-start justify-center mb-1">
                  <MapPin className="w-4 h-4 text-coral mr-1 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-cream/80">{location.address}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="w-4 h-4 text-coral mr-1 flex-shrink-0" />
                  <span className="text-sm text-cream/80">{location.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm mb-4 md:mb-0">
            © 2024 Home of Recovery. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-cream/60 hover:text-coral transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-cream/60 hover:text-coral transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-cream/60 hover:text-coral transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;