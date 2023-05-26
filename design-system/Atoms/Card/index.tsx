import { FC } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

interface CardProps {
  imgSrc?: string;
  iHeight?: 'h-9' | 'h-11';
  iWidth?: 'w-9' | 'w-11';
  title: string;
  subTitle?: string;
  numberOfCommits: number;
  status: boolean;
}

export const Card: FC<CardProps> = ({
  imgSrc,
  title,
  iHeight = 'h-9',
  iWidth = 'w-9',
  subTitle,
  numberOfCommits,
  status,
}) => {
  return (
    <li className="block w-full px-2 py-4 border rounded-lg cursor-pointer bg-neutral-200 border-neutral-200">
      <Link passHref href="#" legacyBehavior>
        <a className="flex-shrink-0 block w-full group">
          <div className="flex items-center space-x-2">
            {imgSrc ? (
              <div className="relative inline-block">
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
                <span
                  className="absolute bottom-0 right-0 block w-4 h-4 text-[10px] bg-primary-500 rounded-full ring-1 ring-white text-center text-white font-Inter font-semibold"
                  title="number of commits"
                >
                  {numberOfCommits}
                </span>
              </div>
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
              <div className="flex items-center justify-between">
                <h2 className="card-title">{title}</h2>

                {/* <BsCheckCircle
                  className={`w-4 h-4  text-green-500 ${
                    status ? 'inline-block' : 'hidden'
                  }`}
                  title="PR-Status"
                /> */}
              </div>

              <p className="text-xs font-light text-neutral-600">
                repo: {subTitle}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <BsCheckCircle
                className={`w-4 h-4  text-green-500 ${
                  status ? 'inline-block' : 'hidden'
                }`}
                title="PR-Status"
              />
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};
