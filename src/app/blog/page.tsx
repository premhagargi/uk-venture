
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Newspaper, CalendarDays, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

const sentenceContainerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
  }),
};

const wordChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 },
  },
};

const sectionStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = (index: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' }
  }
});

const pageTitle = "Financial Insights & Market News";
const pageDescription = "Stay updated with the latest trends, analysis, and expert opinions from the world of finance. Your source for informed investment decisions.";

const blogPosts = [
  {
    id: 1,
    title: "Understanding the Bull and Bear Markets in 2025",
    description: "A deep dive into the market dynamics that are shaping investment strategies this year. Learn how to navigate the highs and lows.",
    author: "Jane Doe",
    date: "2025-07-15T10:00:00Z",
    category: "Market Analysis",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "stock market graph",
    authorAvatarSrc: "https://placehold.co/100x100.png",
    authorAvatarHint: "financial analyst portrait",
    slug: "/blog/understanding-bull-bear-markets-2025",
  },
  {
    id: 2,
    title: "The Rise of ESG Investing: A Guide for Modern Investors",
    description: "Environmental, Social, and Governance (ESG) criteria are becoming crucial. Discover how to align your portfolio with your values.",
    author: "John Smith",
    date: "2025-07-12T14:30:00Z",
    category: "Investing 101",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "sustainable energy",
    authorAvatarSrc: "https://placehold.co/100x100.png",
    authorAvatarHint: "investment advisor",
    slug: "/blog/rise-of-esg-investing",
  },
  {
    id: 3,
    title: "Top 5 Technology Stocks to Watch in the Second Half of the Year",
    description: "We analyze the tech giants and emerging players poised for growth. Find out which stocks should be on your radar.",
    author: "Emily White",
    date: "2025-07-10T09:00:00Z",
    category: "Stock Picks",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "glowing circuit board",
    authorAvatarSrc: "https://placehold.co/100x100.png",
    authorAvatarHint: "tech journalist",
    slug: "/blog/top-5-tech-stocks",
  },
  {
    id: 4,
    title: "Navigating IPOs: A Beginner's Handbook to Initial Public Offerings",
    description: "IPOs can be exciting but risky. Our handbook breaks down everything you need to know before you invest in a newly listed company.",
    author: "Michael Brown",
    date: "2025-07-08T11:00:00Z",
    category: "Investing 101",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "launching rocket",
    authorAvatarSrc: "https://placehold.co/100x100.png",
    authorAvatarHint: "venture capitalist",
    slug: "/blog/ipo-beginners-handbook",
  },
  {
    id: 5,
    title: "The Psychology of Trading: How to Keep Your Emotions in Check",
    description: "Fear and greed are powerful forces in the market. Learn strategies to maintain discipline and make rational trading decisions.",
    author: "Dr. Sarah Green",
    date: "2025-07-05T16:00:00Z",
    category: "Strategy",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "calm meditating person",
    authorAvatarSrc: "https://placehold.co/100x100.png",
    authorAvatarHint: "behavioral psychologist",
    slug: "/blog/psychology-of-trading",
  },
  {
    id: 6,
    title: "Retirement Planning: Are You Saving Enough for Your Future?",
    description: "A comprehensive look at retirement goals, savings strategies, and how to make your money work for you in the long run.",
    author: "David Chen",
    date: "2025-07-01T08:00:00Z",
    category: "Financial Planning",
    imageSrc: "https://placehold.co/600x400.png",
    imageHint: "happy retired couple",
    authorAvatarSrc: "https://placehold.co/100x100.png",
    authorAvatarHint: "financial planner",
    slug: "/blog/retirement-planning-guide",
  },
];


export default function BlogPage() {
  return (
    <>
      <motion.div
        className="bg-card p-6 md:p-8 text-center"
        initial="hidden"
        animate="visible"
        variants={sentenceContainerVariants}
      >
        <motion.div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-full mb-4" variants={fadeInUpVariants}>
          <Newspaper className="h-6 w-6 text-primary" />
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground"
            variants={sentenceContainerVariants}
          >
            {pageTitle.split(" ").map((word, index) => (
              <motion.span key={index} variants={wordChildVariants} style={{ display: "inline-block", marginRight: "0.25em" }}>{word}</motion.span>
            ))}
          </motion.h1>
        </motion.div>
        <motion.p className="mt-2 max-w-3xl mx-auto text-muted-foreground md:text-xl" variants={fadeInUpVariants}>
          {pageDescription}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={sectionStaggerVariants}
      >
        {blogPosts.map((post, index) => (
          <motion.div key={post.id} variants={cardVariants(index)}>
            <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Link href={post.slug} className="block">
                <CardHeader className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      data-ai-hint={post.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
              </Link>
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 flex-grow">
                  <Link href={post.slug} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0 border-t mt-auto">
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={post.authorAvatarSrc} alt={post.author} data-ai-hint={post.authorAvatarHint}/>
                            <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{post.author}</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        <time dateTime={post.date}>
                            {format(parseISO(post.date), 'MMM d, yyyy')}
                        </time>
                    </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
