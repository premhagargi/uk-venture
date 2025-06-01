
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { APP_NAME } from '@/lib/constants';
import { Target, History, Users, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: `About Us`,
  description: `Learn about {APP_NAME}'s mission, history, and the dedicated team committed to your financial success.`,
};

const teamMembers = [
  {
    name: "Akhil Paranjape",
    role: "CEO/Founder",
    avatarSrc: "https://placehold.co/100x100.png", // Replace with the actual URL of Naveen K R's photo once hosted
    avatarHint: "CEO/Founder",
    initials: "AP",
    linkedin: "#" // Replace with actual LinkedIn URL if available
  },
  {
    name: "Naveen K R",
    role: "Senior Director",
    avatarSrc: "https://placehold.co/100x100.png", // Replace with the actual URL of Naveen K R's photo once hosted
    avatarHint: "senior director portrait",
    initials: "NKR",
    linkedin: "#" // Replace with actual LinkedIn URL if available
  },
];

const historyItems = [
  { year: "2010", event: "Foundation & Vision", description: `${APP_NAME} was founded with a vision to democratize financial planning.` },
  { year: "2015", event: "Expansion of Services", description: "Introduced comprehensive investment management and retirement solutions." },
  { year: "2020", event: "Technology Integration", description: "Launched our first AI-driven financial insights tool for clients." },
  { year: "2024", event: "Continued Growth", description: "Celebrating over a decade of client success and financial empowerment." },
];

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 pt-12 md:pt-28 pb-16 md:pb-20 lg:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
          About ${APP_NAME}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Discover our story, our values, and the people dedicated to empowering your financial journey.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              width={600}
              height={400}
              alt="Team collaboration"
              data-ai-hint="team meeting"
              className="rounded-xl shadow-xl object-cover aspect-[3/2]"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Target className="h-10 w-10 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To provide transparent, expert, and personalized financial guidance that empowers our clients to achieve their life goals with confidence and clarity. We are committed to building long-term relationships based on trust and integrity.
            </p>
            <div className="flex items-center gap-4 mt-6">
               <History className="h-10 w-10 text-primary" />
              <h2 className="text-3xl font-semibold text-foreground">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the most trusted financial partner, recognized for our innovative solutions, client-centric approach, and unwavering commitment to financial well-being in our community and beyond.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Our History Section */}
      <section className="mb-16">
         <div className="text-center mb-10">
             <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <History className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-semibold text-foreground">Our History</h2>
             </div>
            <p className="mt-2 max-w-3xl mx-auto text-muted-foreground md:text-lg">
              Founded with a passion for making expert financial advice accessible, ${APP_NAME} has grown from a small advisory firm to a respected name in portfolio management. Our journey is marked by a relentless pursuit of excellence and a deep understanding of our clients' evolving needs. We continuously adapt to the dynamic financial landscape to offer cutting-edge strategies and timeless wisdom.
            </p>
        </div>
         <div className="relative mt-8">
           <div className="absolute top-0 bottom-0 w-0.5 bg-border left-3 md:left-1/2 md:w-1 md:-translate-x-1/2"></div>
            <div className="space-y-8 md:space-y-12">
              {historyItems.map((item, index) => (
                <div
                  key={item.year}
                  className={cn(
                    "relative",
                    "md:flex md:items-center",
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  <div className="hidden md:block md:w-5/12"></div>
                  <div className="hidden md:flex md:w-2/12 justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary ring-4 ring-background shadow-md"></div>
                  </div>
                  <div className="absolute left-3 top-1 w-6 h-6 rounded-full bg-primary ring-4 ring-background shadow-md md:hidden transform -translate-x-1/2">
                  </div>
                  <div
                    className={cn(
                      "ml-10 p-4 rounded-lg shadow-lg bg-card text-left",
                      "md:w-5/12 md:ml-0",
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    )}
                  >
                    <h3 className="text-xl font-bold text-primary">{item.year} - {item.event}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Meet Our Team Section */}
      <section>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">Meet Our Team</h2>
          </div>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            The dedicated professionals behind your financial success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <CardContent className="p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
                  <AvatarImage src={member.avatarSrc} alt={member.name} data-ai-hint={member.avatarHint} />
                  <AvatarFallback className="text-2xl bg-muted text-muted-foreground">{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn Profile</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
