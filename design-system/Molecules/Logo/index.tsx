import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({}) => {
  return (
    <div className="flex items-center flex-shrink-0">
      <Link href="/" className="flex items-center gapx-2">
        <span className="sr-only">GitAI</span>
        <Image
          className="z-10 inline-block w-auto h-8 sm:h-14"
          src="/GitAI.png"
          alt="GitAI"
          width={24}
          height={24}
        />
        <span className="inline-block ml-1 text-3xl leading-9 text-neutral-50 font-Kalam">
          GitAI
        </span>
      </Link>
    </div>
  );
};

export const InternalLogo = ({}) => {
  return (
    <div className="flex items-center flex-shrink-0 px-4">
      <Image
        width={24}
        height={24}
        className="w-auto h-11 backdrop-saturate-125"
        src="/GitAI.png"
        alt="Your Company"
      />

      <div>
        <h2 className="font-extrabold section-title font-Kalam">GitAI</h2>
        <p className="-mt-1 text-sm font-light font-Kalam text-neutral-600">
          Powered by AI
        </p>
      </div>
    </div>
  );
};
