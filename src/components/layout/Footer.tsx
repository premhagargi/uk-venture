import { APP_NAME, NAV_LINKS } from '@/lib/constants';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, BarChartBig } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const contactDetails = [
    { icon: Phone, value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: Mail, value: "support@ukventure.com", href: "mailto:support@ukventure.com" },
    { icon: MapPin, value: "123 Finance Street, Wealth City, TX 75001" },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
               <BarChartBig className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">{APP_NAME}</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Cutting-edge financial services for modern investors, focusing on technology, transparency, and trust.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              {contactDetails.map((item, index) => (
                 <li key={index} className="flex items-start gap-3">
                   <item.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
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
            <h3 className="text-lg font-semibold text-foreground mb-3">Follow Us</h3>
            <div className="flex space-x-4">
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                 <Linkedin className="h-6 w-6" />
                 <span className="sr-only">LinkedIn</span>
               </a>
              {/* Add other social links here */}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      <div className="container mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
             Built with professionalism by <a href="#" className="hover:text-primary">AD Chariot</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
