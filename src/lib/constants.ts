import type { LucideIcon } from 'lucide-react';
import { Briefcase, LayoutDashboard, Users, Mail, Info, Sparkles, Landmark, LineChart, ShieldCheck, HomeIcon, Building, MessageSquare, UserCheck, CreditCard, Rocket, Wallet, FileText, TrendingUp, Layers, UsersRound, Target, Lightbulb, Handshake, GraduationCap, Goal, Newspaper } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/blog', label: 'Blog', icon: Newspaper },
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
  features?: string[];
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'equity-investing',
    title: 'Equity Investing',
    description: 'Invest in stocks with a platform empowering you with education, data, and research.',
    longDescription: 'Investing in stocks was never this simple. UK Venture provides the platform that empowers you with everything you need to trade stocks, be it financial education, market data, or high-quality research - you get it all in one place. Make informed decisions and build your equity portfolio with confidence.',
    icon: TrendingUp,
    imageSrc: '/equityinvesting.png',
    imageHint: 'stock market chart',
  },
  {
    id: 'derivatives-trading',
    title: 'Derivatives Trading (Futures & Options)',
    description: 'Hedge or speculate on price movements with powerful trading platforms for Futures & Options.',
    longDescription: 'Hedge or speculate on the price movement of stocks with UK Venture\'s derivatives trading services. Whether you are an equity trader, new to derivatives, or a seasoned veteran, we can help you pursue your trading strategies with our powerful trading platforms. Our offerings include Futures & Options to manage risk and capitalize on market opportunities.',
    icon: Layers,
    imageSrc: '/derivatives.png',
    imageHint: 'financial derivatives graph',
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds',
    description: 'Your money in professional hands. Let professionals manage your investments.',
    longDescription: 'Too busy to track your investment? Let professionals do it for you. With UK Venture\'s mutual fund services, benefit from professionally managed and diversified portfolios. Enjoy high liquidity, zero transaction costs, and the assurance of SEBI regulation to protect your interests.',
    icon: Wallet,
    imageSrc: '/mutualfunds.webp',
    imageHint: 'mutual fund investment',
    features: [
        "Professionally Managed: Professional Fund Managers smartly invest your money by picking investment opportunities.",
        "Diversification: Investment across sectors helps you to diversify your portfolio.",
        "Liquidity: Ease of investing and withdrawing at any point of time.",
        "Zero Transaction Cost: We charge no transaction fee on Mutual Funds investment.",
        "Regulated by SEBI to protect your interest."
    ]
  },
  {
    id: 'ipo-investing',
    title: 'IPO Investing',
    description: 'Participate in tomorrow’s growth stories with seamless IPO investments.',
    longDescription: 'Be a part of tomorrow’s growth stories. Excited about a company getting listed on the exchange and want to participate in it? Invest in Initial Public Offerings (IPOs) online with UK Venture. Enjoy a hassle-free, zero-paperwork process to seize opportunities in emerging businesses.',
    icon: Rocket,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'ipo opportunities',
  },
  {
    id: 'demat-account',
    title: 'Demat Account',
    description: 'Securely hold and manage your securities in a digital demat account.',
    longDescription: 'Open a demat account with UK Venture to securely store and manage your securities in a digital format. Our platform simplifies the process, offering seamless access to your investments, real-time tracking, and integration with trading services for a streamlined investment experience.',
    icon: Briefcase,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'demat account secure',
  },
  {
    id: 'portfolio-management',
    title: 'Portfolio Management Services (PMS)',
    description: 'Personalized portfolio management for optimized wealth growth and expert guidance.',
    longDescription: 'Our Portfolio Management Services (PMS) offer tailored investment strategies to maximize your wealth. With expert guidance, we design and manage portfolios aligned with your financial goals, leveraging cutting-edge technology and research to ensure long-term growth and risk management.',
    icon: LineChart,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'portfolio optimization chart',
  },
  {
    id: 'physical-to-demat',
    title: 'Physical Shares to Demat',
    description: 'Convert your physical share certificates to digital demat format easily.',
    longDescription: 'Easily convert your physical share certificates into demat form with our streamlined service. Enjoy the convenience of digital management, secure storage, and easy trading of your securities, all supported by our expert team to ensure a hassle-free process.',
    icon: FileText,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'document conversion digital',
  },
  {
    id: 'free-consultancy',
    title: 'Free Financial Consultancy',
    description: 'Expert financial advice at no cost to guide your investment decisions.',
    longDescription: 'Access our free financial consultancy service to receive personalized advice from our experts. We provide guidance on investments, financial planning, and risk management, empowering you to make informed decisions without any cost, tailored to your unique financial goals.',
    icon: UsersRound,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'financial advisor meeting',
  },
  {
    id: 'mtf-funding',
    title: 'Large MTF Fundings',
    description: 'Boost your trading capacity with substantial Margin Trading Facility (MTF) funding.',
    longDescription: 'Enhance your trading potential with our large Margin Trading Facility (MTF) funding. Available to eligible individuals and corporates, this service allows you to leverage your demat holdings for increased market exposure, supported by our robust digital platform and expert insights.',
    icon: CreditCard,
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'margin trading graph',
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
