
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const blogPostFormSchema = z.object({
  title: z.string().min(10, { message: 'Title must be at least 10 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  category: z.string().min(3, { message: 'Please select a category.' }),
  author: z.string().min(2, { message: 'Author name must be at least 2 characters.' }),
  image: z.any().refine(files => files?.length === 1, 'Image is required.'),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

// This is a placeholder for a server action.
async function submitBlogPost(data: BlogPostFormValues): Promise<{ success: boolean; message: string }> {
  // In a real app, you would:
  // 1. Upload the image file to a service like Firebase Storage.
  // 2. Get the public URL of the uploaded image.
  // 3. Save the blog post data (including the image URL) to a database like Firestore.
  console.log('Blog Post Data to be submitted:', {
    ...data,
    image: data.image[0].name, // Just logging the file name for now
  });

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  return { success: true, message: 'Blog post has been created successfully! (Placeholder)' };
}

export function BlogPostForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      author: '',
    },
  });
  
  const fileRef = form.register("image");

  function onSubmit(data: BlogPostFormValues) {
    startTransition(async () => {
      try {
        const result = await submitBlogPost(data);
        if (result.success) {
          toast({
            title: 'Post Created!',
            description: result.message,
          });
          form.reset();
        } else {
          toast({
            title: 'Error',
            description: result.message,
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="The Future of AI in Finance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short summary of the blog post..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a blog category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                      <SelectItem value="Investing 101">Investing 101</SelectItem>
                      <SelectItem value="Stock Picks">Stock Picks</SelectItem>
                      <SelectItem value="Strategy">Strategy</SelectItem>
                      <SelectItem value="Financial Planning">Financial Planning</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="file" className="pl-12" {...fileRef} />
                    <Upload className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormDescription>Upload a cover image for the blog post (e.g., JPG, PNG).</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            'Publish Post'
          )}
        </Button>
      </form>
    </Form>
  );
}
