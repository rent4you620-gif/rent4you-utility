import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Rent4You Utility logo"
      width={40}
      height={40}
      priority
    />
  );
}
