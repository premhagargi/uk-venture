
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

function formatDescription(text: string): string {
  // If the text already contains line breaks, the user has formatted it. Respect it.
  if (text.includes('\n')) {
    return text;
  }

  // Split text into sentences. This regex handles ., !, and ? as delimiters
  // and keeps the delimiter with the sentence.
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  if (sentences.length <= 2) {
    return text;
  }

  let formattedText = '';
  // Group sentences into pairs to form paragraphs.
  for (let i = 0; i < sentences.length; i += 2) {
    // Get the current pair of sentences.
    const sentencePair = sentences.slice(i, i + 2).join(' ').trim();
    formattedText += sentencePair;

    // Add a double newline to create a paragraph break, but not after the last pair.
    if (i + 2 < sentences.length) {
      formattedText += '\n\n';
    }
  }

  return formattedText;
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
    let description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;

    if (!title || !description || !category || !author) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Format the description for readability if needed
    description = formatDescription(description);

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
