
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES_DATA, APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Our Services | ${APP_NAME}`,
  description: `Explore the range of financial services offered by ${APP_NAME}, including financial planning, investment management, retirement planning, and insurance solutions.`,
};

export default function ServicesPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
          Our Financial Services
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
          At ${APP_NAME}, we provide a comprehensive suite of financial services designed to meet your unique needs and help you achieve your long-term goals.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16">
        {SERVICES_DATA.map((service, index) => (
          <Card key={service.id} id={service.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
            <div className={`grid md:grid-cols-2 gap-6 md:gap-8 items-center ${index % 2 !== 0 ? 'md:grid-flow-row-dense' : ''}`}>
              <div className={`p-6 md:p-8 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <service.icon className="w-8 h-8" />
                </div>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-3xl font-semibold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.longDescription}
                  </CardDescription>
                </CardContent>
              </div>
              <div className={`relative h-64 md:h-full ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  data-ai-hint={service.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
