import Image from 'next/image';

type BrandMarkProps = {
  inverse?: boolean;
};

export function BrandMark({ inverse = false }: BrandMarkProps) {
  return (
    <span className="brand-mark">
      <Image
        className="brand-mark__full-logo"
        src={inverse ? '/brand/full-inverse.svg' : '/brand/full-primary.svg'}
        alt="Bayes Institute"
        width={1483}
        height={505}
      />
    </span>
  );
}
