import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TESTIMONIALS_DATA } from '@/lib/constants';

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            What Our Clients Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Real stories from clients who trust Axis Portfolio Pulse with their financial future.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <testimonial.icon className="h-8 w-8 text-primary mb-4" />
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg italic text-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.author} data-ai-hint={testimonial.avatarHint} />
                    <AvatarFallback>{testimonial.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
