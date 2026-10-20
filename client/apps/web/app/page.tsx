import Image from 'next/image';
import { Button } from '@bayes/ui';

export default function Home() {
  return (
    <main>
      <Image
        src="/brand/logo-primary.svg"
        alt="Bayes Institute"
        width={240}
        height={60}
        priority
      />
      <p className="eyebrow">Bayes Institute</p>
      <h1>A new foundation for learning.</h1>
      <p className="lede">
        The public experience is being rebuilt. This is a clean starting point for the next Bayes
        Institute chapter.
      </p>
      <Button>Explore what&apos;s next</Button>
    </main>
  );
}
