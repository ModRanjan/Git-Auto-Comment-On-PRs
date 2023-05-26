import { FC } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/design-system/Atoms/Button';

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
}) => {
  return (
    <div className="flex justify-between h-20 pt-2 pb-4 text-sm border-b border-neutral-300">
      <div className="flex items-center w-full gap-x-4">
        <div className="w-10 h-10 text-white rounded-full bg-info-600">
          {user_avatar ? (
            <>
              <Image
                className="rounded-full"
                src={user_avatar}
                alt={'user_name'}
                width="42"
                height="42"
              />
            </>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex-1 w-full">
          <h3 className="card-title hover:text-primary-550 hover:underline">
            <Link href={html_url} target="_blank">
              {PRTitle}
            </Link>
          </h3>

          <p className="text-sm text-neutral-550">
            Branch: {from_branch}{' '}
            <BsArrowLeftShort className="inline-block w-6 h-6" />
            {to_branch}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end ml-auto gap-x-6">
        <label className="text-base text-neutral-700 md:whitespace-nowrap">
          Auto Comment
        </label>
        <Button
          variant={'primary'}
          size={'slim'}
          className="rounded-lg"
          type="button"
        >
          <Link href={html_url} target="_blank">
            View
          </Link>
        </Button>

        {/* <ToggleButton enabled={enabled} setEnabled={ToggleHandler} /> */}
      </div>
    </div>
  );
};

export default PRs;
