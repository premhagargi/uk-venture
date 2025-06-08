import { APP_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="mt-1">
          Built with professionalism and trust by AD Chariot.
        </p>
      </div>
    </footer>
  );
}
