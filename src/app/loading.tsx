import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center p-4">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-semibold text-foreground">Loading Page...</h1>
      <p className="text-muted-foreground">Please wait while we prepare the content for you.</p>
    </div>
  );
}
