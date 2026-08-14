import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-[var(--line)] bg-[var(--porcelain)]">
      <Link href="/" aria-label="Bayes Institute Home">
        <Image 
          src="/assets/logos/logo-primary.svg" 
          alt="Bayes Institute" 
          width={180} 
          height={48} 
          priority
          className="h-10 w-auto"
        />
      </Link>
      <div className="flex gap-8">
        <Link 
          href="/fellowship" 
          className="text-[var(--ink)] hover:text-[var(--burgundy-600)] transition-colors font-sans font-bold tracking-wide uppercase text-sm"
        >
          Fellowship
        </Link>
        <Link 
          href="/ideas" 
          className="text-[var(--ink)] hover:text-[var(--burgundy-600)] transition-colors font-sans font-bold tracking-wide uppercase text-sm"
        >
          Ideas
        </Link>
        <Link 
          href="/library" 
          className="text-[var(--ink)] hover:text-[var(--burgundy-600)] transition-colors font-sans font-bold tracking-wide uppercase text-sm"
        >
          Library
        </Link>
      </div>
    </nav>
  );
}
