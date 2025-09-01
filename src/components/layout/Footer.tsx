
import { APP_NAME, NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, BarChartBig } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const contactDetails = [
    { icon: Phone, value: "+91 7411386561", href: "tel:+917411386561" },
    { icon: Mail, value: "ukadvisory1009@gmail.com", href: "mailto:ukadvisory1009@gmail.com" },
    { icon: MapPin, value: "Ajanta Complex, CTS No 1505, B-1, Beside Satkar Hotel, Maruti Galli, Belagavi - 590001" },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <BarChartBig className="h-7 w-7 text-primary" />
              <span className="text-lg font-bold text-foreground">{APP_NAME}</span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Cutting-edge financial services for modern investors, focusing on technology, transparency, and trust.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            {/* Navigation Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Quick Links</h3>
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/admin/blog/new"
                    className="text-muted-foreground hover:text-primary transition-colors text-xs"
                  >
                    Create Post
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Contact Us</h3>
              <ul className="space-y-1 text-xs">
                {contactDetails.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <item.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground break-all">{item.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Follow Us</h3>
              <div className="flex space-x-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                {/* Add other social links here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      <div className="container mx-auto px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-1 sm:space-y-0">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with professionalism by <a href="#" className="hover:text-primary">AD Chariot</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
