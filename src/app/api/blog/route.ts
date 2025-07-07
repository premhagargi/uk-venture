
import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !description || !category || !author || !imageFile) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Convert file to buffer to handle it reliably on the server
    const imageBuffer = await imageFile.arrayBuffer();

    // Upload image to Firebase Storage with explicit content type
    const storageRef = ref(storage, `blog-images/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageBuffer, { contentType: imageFile.type });
    const imageUrl = await getDownloadURL(storageRef);

    // Save blog post to Firestore
    const blogCollection = collection(db, 'blogPosts');
    await addDoc(blogCollection, {
      title,
      description,
      category,
      author,
      imageUrl,
      createdAt: serverTimestamp(),
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''), // basic slug generation
    });

    return NextResponse.json({ success: true, message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
