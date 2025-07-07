
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function areFirebaseVarsPresent(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET &&
    !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &&
    !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  );
}

export async function POST(request: Request) {
  if (!areFirebaseVarsPresent()) {
    console.error("Firebase environment variables are missing in the deployed environment.");
    return NextResponse.json(
      { 
        success: false, 
        message: 'Server configuration error. Firebase credentials are not set up correctly for the deployed environment.' 
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;

    if (!title || !description || !category || !author) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Save blog post to Firestore
    const blogCollection = collection(db, 'blogPosts');
    await addDoc(blogCollection, {
      title,
      description,
      category,
      author,
      createdAt: serverTimestamp(),
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''), // basic slug generation
    });

    return NextResponse.json({ success: true, message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', JSON.stringify(error, null, 2));
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: errorMessage, errorDetails: error }, { status: 500 });
  }
}
