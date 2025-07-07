
'use client';

import { BlogPostForm } from '@/components/forms/BlogPostForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] },
  },
};

export default function NewBlogPostPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
      className="max-w-4xl mx-auto"
    >
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Create a New Blog Post</CardTitle>
          <CardDescription>
            Fill out the form below to publish a new article to the blog. The post data will be stored using Firebase Firestore.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogPostForm />
        </CardContent>
      </Card>
    </motion.div>
  );
}
