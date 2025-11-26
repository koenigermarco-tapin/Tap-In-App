import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { TapHomeButton } from '@/components/ui/TapHomeButton';

export function Layout() {
  return (
    <div className="min-h-screen bg-bg-dark flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <TapHomeButton />
      <footer className="border-t border-white/10 py-6 px-4 text-center text-white/60 text-sm">
        <p>© 2025 TAP-IN • Built with 🥋 in Austria</p>
      </footer>
    </div>
  );
}

