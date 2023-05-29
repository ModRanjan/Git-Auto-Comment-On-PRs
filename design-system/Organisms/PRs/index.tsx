import { FC } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { TbGitPullRequestClosed } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/design-system/Atoms/Button';
import { BiGitPullRequest } from 'react-icons/bi';
import { FiGitCommit } from 'react-icons/fi';
import { Icon } from '@/design-system/Atoms/Icon';

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
}

const PRs: FC<PRsProps> = ({
  PRTitle,
  user_avatar,
  from_branch,
  to_branch,
  html_url,
  status,
  numberOfCommits,
}) => {
  return (
    <div className="flex justify-between h-20 pt-2 pb-4 text-sm border-b border-neutral-300">
      <div className="flex items-center w-full gap-x-4">
        <div className="w-12 h-12 text-white rounded-full bg-info-600">
          {user_avatar ? (
            <>
              <Image
                className="rounded-full"
                src={user_avatar}
                alt={'user_name'}
                width="46"
                height="46"
              />
            </>
          ) : (
            <div className=""></div>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="flex items-center gap-x-2">
            <h3 className="card-title">{PRTitle}</h3>

            <span
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
            </span>

            <Icon
              icon={status ? BiGitPullRequest : TbGitPullRequestClosed}
              className={`inline-block md:hidden w-[14px] h-[14px] mr-1 text-white ${
                status ? 'bg-orange-500 ' : 'bg-neutral-700'
              }`}
            />
          </div>

          <p className="mt-1 text-sm text-neutral-550">
            Branch:{' '}
            <span className="bg-[#DDF4FE] text-[#3B6BDA] px-2 py-[0.5px]">
              {to_branch}
            </span>
            <BsArrowLeftShort className="inline-block w-6 h-6" />
            <span className="bg-[#DDF4FE] text-[#3B6BDA] px-2 py-[0.5px]">
              {from_branch}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center md:flex-row gap-x-1">
          <p className="text-sm text-neutral-550">
            <FiGitCommit className="inline-block w-5 h-5 mr-2" />
            Commits
          </p>
          <span
            className={
              'rounded-full px-1 py-[1px] bg-[#c1c3ca]/30 text-neutral-600'
            }
          >
            {numberOfCommits}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end px-5 ml-auto gap-x-6">
        <label className="text-base text-neutral-700 md:whitespace-nowrap"></label>
        <Button
          variant={'primary'}
          size={'slim'}
          className="rounded-lg"
          type="button"
        >
          <Link href={html_url} target="_blank">
            <span className="text-sm font-normal font-Inter">View</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PRs;
