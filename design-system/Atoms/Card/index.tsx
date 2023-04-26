import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

interface CardProps {
  imgSrc?: string;
  iHeight?: 'h-9' | 'h-11';
  iWidth?: 'w-9' | 'w-11';
  title: string;
  subTitle?: string;
}

export const Card: FC<CardProps> = ({
  imgSrc,
  title,
  iHeight = 'h-9',
  iWidth = 'w-9',
  subTitle,
}) => {
  return (
    <li className="block w-full px-2 py-4 border rounded-lg cursor-pointer bg-neutral-200 border-neutral-200">
      <Link passHref href="#" legacyBehavior>
        <a className="flex-shrink-0 block w-full group">
          <div className="flex items-center space-x-2">
            {imgSrc ? (
              <Image
                src={imgSrc}
                className={classNames(
                  'inline-block rounded-full bg-secondary-200',
                  iHeight,
                  iWidth,
                )}
                alt={title}
                width={46}
                height={46}
                quality={100}
              />
            ) : (
              <span
                className={classNames(
                  'inline-block rounded-full bg-secondary-200',
                  iHeight,
                  iWidth,
                )}
              ></span>
            )}

            <div className="flex-1 font-Inter">
              <h2 className="card-title">{title}</h2>

              <p className="text-xs font-light text-neutral-600">{subTitle}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};
