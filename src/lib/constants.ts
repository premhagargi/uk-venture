import type { LucideIcon } from 'lucide-react';
import { Briefcase, LayoutDashboard, Users, Mail, Info, Sparkles, Landmark, LineChart, ShieldCheck, HomeIcon, Building, MessageSquare, UserCheck } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/insights', label: 'Insights', icon: Sparkles },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  imageSrc: string;
  imageHint: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'financial-planning',
    title: 'Comprehensive Financial Planning',
    description: 'Tailored strategies for your financial future, covering all aspects of your wealth.',
    longDescription: 'Our comprehensive financial planning service provides a holistic view of your financial situation. We work with you to understand your goals, analyze your current standing, and develop a personalized roadmap. This includes retirement planning, investment strategy, risk management, and estate planning to ensure all pieces of your financial puzzle fit together perfectly.',
    icon: Landmark,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'finance strategy',
  },
  {
    id: 'investment-management',
    title: 'Investment Management',
    description: 'Expert portfolio management to grow and protect your assets effectively.',
    longDescription: 'Navigate the complexities of the market with our expert investment management services. We craft diversified portfolios aligned with your risk tolerance and financial objectives, continuously monitoring and adjusting to market changes. Our goal is to maximize your returns while safeguarding your capital for long-term growth.',
    icon: LineChart,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'stock market',
  },
  {
    id: 'retirement-planning',
    title: 'Retirement Planning',
    description: 'Secure your golden years with our strategic retirement planning solutions.',
    longDescription: 'Plan for a comfortable and secure retirement with our specialized retirement planning services. We help you estimate your retirement needs, optimize your savings, and create an income strategy for your post-work years. Whether you\'re just starting or nearing retirement, we provide the guidance you need.',
    icon: HomeIcon,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'retirement savings',
  },
  {
    id: 'insurance-solutions',
    title: 'Insurance Solutions',
    description: 'Protect what matters most with our comprehensive insurance options.',
    longDescription: 'Safeguard your family, assets, and future with our tailored insurance solutions. We assess your needs and offer a range of products, including life, health, and property insurance. Our aim is to provide you with peace of mind, knowing you\'re protected against unforeseen events.',
    icon: ShieldCheck,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'family protection',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  avatarSrc: string;
  avatarHint: string;
  icon: LucideIcon;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "Axis Portfolio Pulse transformed my financial outlook. Their personalized approach and expert advice have been invaluable.",
    author: 'Priya Sharma',
    company: 'Tech Innovators Inc.',
    avatarSrc: 'https://placehold.co/100x100.png',
    avatarHint: 'professional woman',
    icon: UserCheck,
  },
  {
    id: 'testimonial-2',
    quote: "The team at Axis Portfolio Pulse is knowledgeable, responsive, and truly cares about their clients' success. Highly recommended!",
    author: 'Rajesh Kumar',
    company: 'GreenScape Solutions',
    avatarSrc: 'https://placehold.co/100x100.png',
    avatarHint: 'smiling man',
    icon: MessageSquare,
  },
  {
    id: 'testimonial-3',
    quote: "Thanks to Axis Portfolio Pulse, I feel much more confident about my retirement plans. Their insights are top-notch.",
    author: 'Anita Desai',
    company: 'Creative Designs Co.',
    avatarSrc: 'https://placehold.co/100x100.png',
    avatarHint: 'business person',
    icon: Building,
  },
];

export const APP_NAME = "Axis Portfolio Pulse";
