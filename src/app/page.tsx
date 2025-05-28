import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesHighlight } from '@/components/sections/ServicesHighlight';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Home | ${APP_NAME}`,
  description: `Welcome to ${APP_NAME}. We offer expert financial planning, investment management, and personalized financial advice.`,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesHighlight />
      <TestimonialsSection />
    </>
  );
}
