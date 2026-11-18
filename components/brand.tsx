import Link from "next/link";
import Image from "next/image";
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/brand/playtown-logo-white.png"
      width={1075}
      height={730}
      alt=""
      sizes="86px"
    />
  );
}
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="PlayTown home">
      <BrandMark />
    </Link>
  );
}
