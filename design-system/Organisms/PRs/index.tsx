import { FC, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { TbGitPullRequestClosed } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';

import { BiGitPullRequest } from 'react-icons/bi';
import { FiGitCommit } from 'react-icons/fi';
import { Icon } from '@/design-system/Atoms/Icon';
import { ToggleButton } from '@/design-system/Atoms/Button/ToggleButton';
import { getPRHandle } from '@/services/prs';

interface PRsProps {
  repoTitle: string;
  PRId: number;
  PRTitle: string;
  html_url: string;
  changed_files: number;
  status: boolean;
  from_branch: string;
  to_branch: string;
  numberOfPRs: number;
  numberOfCommits: number;
  user_avatar: string;
  autoComment: boolean;
}

const PRs: FC<PRsProps> = ({
  PRId,
  autoComment,
  PRTitle,
  user_avatar,
  from_branch,
  to_branch,
  html_url,
  status,
  numberOfCommits,
}) => {
  const [toggle, setToggle] = useState<boolean>(autoComment);

  const ToggleHandler = (PRId: number) => {
    console.log('PRId: ', PRId);
    getPRHandle(PRId);

    setToggle((prev) => !prev);
  };

  return (
    <div className="flex justify-between h-20 pt-2 pb-4 text-sm border-b border-neutral-300">
      <div className="flex items-center w-full gap-x-2 md:gap-x-4">
        <div className="w-12 h-12 text-white rounded-full">
          {user_avatar ? (
            <div className="relative inline-block">
              <Image
                className="w-12 h-12 rounded-full"
                src={user_avatar}
                alt={'user_name'}
                width={46}
                height={46}
                quality={100}
              />

              <span
                className="md:hidden absolute bottom-0 -right-1 block w-5 h-5 text-[10px] bg-primary-500 rounded-full ring-1 ring-white text-center text-white font-Inter font-semibold"
                title="number of commits"
              >
                {numberOfCommits}
              </span>
            </div>
          ) : (
            <span className="inline-block w-12 h-12 rounded-full bg-secondary-200"></span>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="flex gap-2 md:items-center">
            <h3 className="cursor-pointer card-title">{PRTitle}</h3>

            <div
              className={`hidden md:inline-flex  text-white items-center rounded-full px-2 py-[1px] text-xs font-medium  ${
                status ? 'bg-orange-500 ' : 'bg-neutral-700'
              }`}
              title="PR-Status"
            >
              <Icon
                icon={status ? BiGitPullRequest : TbGitPullRequestClosed}
                className={`w-[14px] h-[14px] mr-1`}
              />
              {status ? 'open' : 'close'}
            </div>

            <Icon
              icon={status ? BiGitPullRequest : TbGitPullRequestClosed}
              className={`inline-block md:hidden w-6 h-6 mr-1 text-white rounded-full p-1 ${
                status ? 'bg-orange-500' : 'bg-neutral-700'
              }`}
            />
          </div>

          <div className="relative mt-1 group w-fit">
            <p className="overflow-hidden text-xs md:text-sm text-neutral-550 text-ellipsis line-clamp-1">
              <span className="hidden md:inline-block">Branch: </span>{' '}
              <span className="bg-[#DDF4FE] text-[#3B6BDA] px-1 md:px-2 py-[0.5px]">
                {to_branch}
              </span>{' '}
              from{' '}
              <span className="bg-[#DDF4FE] text-[#3B6BDA] px-1 md:px-2 py-[0.5px]">
                {from_branch}
              </span>
            </p>

            <p className="absolute px-2 py-1 text-xs scale-0 bg-white rounded -right-16 text-neutral-550 -bottom-10 group-hover:scale-100 whitespace-nowrap">
              Branch:{' '}
              <span className="bg-[#DDF4FE] text-[#3B6BDA] px-1 py-[0.5px]">
                {to_branch}
              </span>
              <BsArrowLeftShort className="inline-block w-4 h-4 md:w-6 md:h-6" />
              <span className="bg-[#DDF4FE] text-[#3B6BDA] px-1 py-[0.5px]">
                {from_branch}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end ml-auto gap-x-4 md:gap-x-6">
        <div
          className="items-center hidden cursor-default gap-x-2 md:flex whitespace-nowrap text-neutral-600"
          title={`No. of Commits: ${numberOfCommits}`}
        >
          <FiGitCommit className="inline-block w-5 h-5" />

          <p className="text-sm">Commits</p>

          <span
            className={
              'rounded-full px-1 py-[1px] bg-[#c1c3ca]/30 text-neutral-600'
            }
          >
            {numberOfCommits}
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <label className="text-xs md:text-base text-neutral-700 whitespace-nowrap">
            Auto Comment
          </label>

          <ToggleButton
            enabled={toggle}
            setEnabled={() => ToggleHandler(PRId)}
          />
        </div>

        <Link href={html_url} target="_blank">
          <span className="px-3 py-2 text-sm font-normal text-white border border-current rounded-md bg-primary-500 hover:bg-primary-550 active:bg-primary-600 font-Inter">
            View
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PRs;
