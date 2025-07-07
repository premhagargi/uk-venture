
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt: Timestamp;
  slug: string;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const blogCollection = collection(db, 'blogPosts');
  const q = query(blogCollection, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as BlogPost;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground pl-0">
          <Link href="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={undefined} alt={post.author} />
              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.createdAt.toDate().toISOString()}>
              {format(post.createdAt.toDate(), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>
      </header>
      
      <Separator className="my-8" />

      <div className="text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
        {post.description}
      </div>
    </article>
  );
}
