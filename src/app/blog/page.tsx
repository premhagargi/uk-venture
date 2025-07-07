
'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Newspaper, CalendarDays, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

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

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt: Timestamp;
  slug: string;
}

const LoadingSkeleton = () => (
    <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg">
      <CardHeader className="p-6">
        <div className="space-y-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow">
         <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-4 border-t mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardFooter>
    </Card>
);


export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogCollection = collection(db, 'blogPosts');
        const q = query(blogCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(postsData);
      } catch (err) {
        console.error("Error fetching blog posts: ", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div key={`skeleton-${index}`} variants={cardVariants(index)}>
                <LoadingSkeleton />
            </motion.div>
          ))
        ) : error ? (
            <div className="col-span-full flex flex-col items-center justify-center bg-card p-8 rounded-xl shadow-lg">
                 <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                 <h2 className="text-2xl font-bold text-destructive">An Error Occurred</h2>
                 <p className="text-muted-foreground mt-2">{error}</p>
            </div>
        ) : posts.length === 0 ? (
           <div className="col-span-full flex flex-col items-center justify-center bg-card p-8 rounded-xl shadow-lg">
                 <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                 <h2 className="text-2xl font-bold text-foreground">No Blog Posts Yet</h2>
                 <p className="text-muted-foreground mt-2">Check back later for new articles, or create the first one!</p>
                 <Link href="/admin/blog/new" className="mt-4 text-primary hover:underline">
                    Create a new post
                 </Link>
            </div>
        ) : (
          posts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`} legacyBehavior>
              <motion.div variants={cardVariants(index)} className="cursor-pointer h-full">
                <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardHeader className="p-6">
                      <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                      <CardTitle className="text-xl pt-2 hover:text-primary transition-colors break-words">
                          {post.title}
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-4 border-t mt-auto">
                    <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={undefined} alt={post.author} />
                                <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{post.author}</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4" />
                            <time dateTime={post.createdAt.toDate().toISOString()}>
                                {format(post.createdAt.toDate(), 'MMM d, yyyy')}
                            </time>
                        </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>
    </>
  );
}
