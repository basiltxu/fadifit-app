import { BottomNav } from '../components/BottomNav';
import { TopNav } from '../components/TopNav';
import { MessageCircle } from 'lucide-react';

export function Messages() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Messages" />

      <div className="px-6 py-12 max-w-md mx-auto text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full">
          <MessageCircle className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold mb-2">No Messages Yet</h2>
        <p className="text-muted-foreground">
          Your coach and community messages will appear here
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
