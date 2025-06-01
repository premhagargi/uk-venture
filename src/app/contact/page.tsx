
import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Contact Us | ${APP_NAME}`,
  description: `Get in touch with ${APP_NAME} for financial advice, support, or inquiries. Fill out our contact form or reach us via phone or email.`,
};

const contactDetails = [
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: Mail, label: "Email", value: "support@axispulse.com", href: "mailto:support@axispulse.com" },
  { icon: MapPin, label: "Address", value: "123 Finance Street, Wealth City, TX 75001" },
];

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
          Contact ${APP_NAME}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          We're here to help you with your financial journey. Reach out to us with any questions or to schedule a consultation.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <Card className="shadow-xl rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-xl h-full rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Our Contact Information</CardTitle>
              <CardDescription>You can also reach us through the following channels:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactDetails.map((item, index) => (
                <div key={index}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.label}</h3>
                      {item.href ? (
                         <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors break-all">
                           {item.value}
                         </a>
                      ) : (
                        <p className="text-muted-foreground break-all">{item.value}</p>
                      )}
                    </div>
                  </div>
                  {index < contactDetails.length -1 && <Separator className="my-6" />}
                </div>
              ))}
               <div className="mt-8">
                <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
