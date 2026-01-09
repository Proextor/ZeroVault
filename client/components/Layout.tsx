import { Link, useLocation } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { generateFingerprint } from '../lib/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Command Center', path: '/' },
  { name: 'Vault', path: '/vault' },
  { name: 'Upload', path: '/upload' },
  { name: 'Sharing', path: '/sharing' },
  { name: 'Threats', path: '/threats' },
  { name: 'Assume Breach', path: '/assume-breach' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const fingerprint = generateFingerprint();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation Bar */}
      <nav className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Shield className="w-8 h-8 text-cyan-glow group-hover:animate-pulse-glow transition-all" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-glow to-secondary text-transparent bg-clip-text">
                ZeroVault
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-cyan-glow/20 text-cyan-glow border border-cyan-glow/50'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Zero Trust Status */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full glass-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-400">Server Untrusted ✅</span>
              </div>

              {/* User Identity */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-sm group cursor-pointer hover:bg-white/10 transition-all">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-glow to-secondary flex items-center justify-center text-xs font-bold">
                  U
                </div>
                <span className="text-xs font-mono hidden md:block text-muted-foreground group-hover:text-foreground transition-colors">
                  {fingerprint}
                </span>
              </div>

              {/* Logout Button */}
              <button className="p-2 rounded-md hover:bg-white/10 transition-all text-foreground/70 hover:text-foreground">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-2 rounded text-xs text-center font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-cyan-glow/20 text-cyan-glow'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {item.name.split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
