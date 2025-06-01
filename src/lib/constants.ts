import type { LucideIcon } from 'lucide-react';
import { Briefcase, LayoutDashboard, Users, Mail, Info, Sparkles, Landmark, LineChart, ShieldCheck, HomeIcon, Building, MessageSquare, UserCheck, CreditCard, Rocket, Wallet, File } from 'lucide-react';

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
        id: 'mutual-funds',
            title: 'Mutual Funds',
                description: 'Invest with ease through professionally managed mutual funds.',
                    longDescription: 'Let professional fund managers handle your investments with our mutual fund services. Benefit from diversified portfolios across various sectors, zero transaction costs, and high liquidity, allowing you to invest and withdraw with ease. Ideal for busy investors seeking professional management and long-term growth.',
                        icon: Wallet,
                            imageSrc: 'https://placehold.co/600x400.png',
                                imageHint: 'mutual fund investment',
                                  },
                                    {
                                        id: 'ipo-investing',
                                            title: 'IPO Investing',
                                                description: 'Participate in tomorrow’s growth stories with seamless IPO investments.',
                                                    longDescription: 'Invest in initial public offerings (IPOs) effortlessly with our online platform. Join exciting companies as they list on the exchange, with zero hassle and no paperwork. Our service empowers you to seize opportunities in emerging businesses for potential high returns.',
                                                        icon: Rocket,
                                                            imageSrc: 'https://placehold.co/600x400.png',
                                                                imageHint: 'ipo opportunities',
                                                                  },
                                                                    {
                                                                        id: 'demat-account',
                                                                            title: 'Demat Account',
                                                                                description: 'Securely hold and manage your securities in a demat account.',
                                                                                    longDescription: 'Open a demat account with UK Venture to securely store and manage your securities. Our platform simplifies the process, offering seamless access to your investments, real-time tracking, and integration with trading services for a streamlined investment experience.',
                                                                                        icon: Briefcase,
                                                                                            imageSrc: 'https://placehold.co/600x400.png',
                                                                                                imageHint: 'demat account',
                                                                                                  },
                                                                                                    {
                                                                                                        id: 'portfolio-management',
                                                                                                            title: 'Portfolio Management Services',
                                                                                                                description: 'Personalized portfolio management for optimized wealth growth.',
                                                                                                                    longDescription: 'Our Portfolio Management Services (PMS) offer tailored investment strategies to maximize your wealth. With expert guidance, we design and manage portfolios aligned with your financial goals, leveraging cutting-edge technology and research to ensure long-term growth and risk management.',
                                                                                                                        icon: LineChart,
                                                                                                                            imageSrc: 'https://placehold.co/600x400.png',
                                                                                                                                imageHint: 'portfolio management',
                                                                                                                                  },
                                                                                                                                    {
                                                                                                                                        id: 'physical-to-demat',
                                                                                                                                            title: 'Physical Shares to Demat',
                                                                                                                                                description: 'Convert physical share certificates to digital demat format.',
                                                                                                                                                    longDescription: 'Easily convert your physical share certificates into demat form with our streamlined service. Enjoy the convenience of digital management, secure storage, and easy trading of your securities, all supported by our expert team to ensure a hassle-free process.',
                                                                                                                                                        icon: File,
                                                                                                                                                            imageSrc: 'https://placehold.co/600x400.png',
                                                                                                                                                                imageHint: 'share conversion',
                                                                                                                                                                  },
                                                                                                                                                                    {
                                                                                                                                                                        id: 'free-consultancy',
                                                                                                                                                                            title: 'Free Financial Consultancy',
                                                                                                                                                                                description: 'Expert financial advice at no cost to guide your investments.',
                                                                                                                                                                                    longDescription: 'Access our free financial consultancy service to receive personalized advice from our experts. We provide guidance on investments, financial planning, and risk management, empowering you to make informed decisions without any cost, tailored to your unique financial goals.',
                                                                                                                                                                                        icon: Users,
                                                                                                                                                                                            imageSrc: 'https://placehold.co/600x400.png',
                                                                                                                                                                                                imageHint: 'financial advice',
                                                                                                                                                                                                  },
                                                                                                                                                                                                    {
                                                                                                                                                                                                        id: 'mtf-funding',
                                                                                                                                                                                                            title: 'Margin Trading Facility',
                                                                                                                                                                                                                description: 'Boost your trading capacity with large MTF funding.',
                                                                                                                                                                                                                    longDescription: 'Enhance your trading potential with our large Margin Trading Facility (MTF) funding. Available to eligible individuals and corporates, this service allows you to leverage your demat holdings for increased market exposure, supported by our robust digital platform and expert insights.',
                                                                                                                                                                                                                        icon: CreditCard,
                                                                                                                                                                                                                            imageSrc: 'https://placehold.co/600x400.png',
                                                                                                                                                                                                                                imageHint: 'margin trading',
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
    quote: "UK Venture transformed my financial outlook. Their personalized approach and expert advice have been invaluable.",
    author: 'Priya Sharma',
    company: 'Tech Innovators Inc.',
    avatarSrc: 'https://placehold.co/100x100.png',
    avatarHint: 'professional woman',
    icon: UserCheck,
  },
  {
    id: 'testimonial-2',
    quote: "The team at UK Venture is knowledgeable, responsive, and truly cares about their clients' success. Highly recommended!",
    author: 'Rajesh Kumar',
    company: 'GreenScape Solutions',
    avatarSrc: 'https://placehold.co/100x100.png',
    avatarHint: 'smiling man',
    icon: MessageSquare,
  },
  {
    id: 'testimonial-3',
    quote: "Thanks to UK Venture, I feel much more confident about my retirement plans. Their insights are top-notch.",
    author: 'Anita Desai',
    company: 'Creative Designs Co.',
    avatarSrc: 'https://placehold.co/100x100.png',
    avatarHint: 'business person',
    icon: Building,
  },
];

export const APP_NAME = "UK Venture";
