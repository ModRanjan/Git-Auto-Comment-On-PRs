import React, { FC, useState } from 'react';
import { BiGitRepoForked } from 'react-icons/bi';

import { ToggleButton } from '@/Atoms/Button/ToggleButton';
import { ReposType } from '@/types/Repos';
import Link from 'next/link';

interface RepositoryProps {
  RepoData: ReposType;
  onClickHandler: () => void;
}

export const Repository: FC<RepositoryProps> = ({
  RepoData,
  onClickHandler,
}) => {
  const [enabled, setEnabled] = useState(RepoData.isHookExists);

  const ToggleHandler = () => {
    if (!enabled) onClickHandler();

    setEnabled(!enabled);
  };

  return (
    <div className="flex justify-between h-20 pt-2 pb-4 text-sm border-b border-neutral-300">
      <div className="flex items-center w-full gap-x-4">
        <BiGitRepoForked className="w-10 h-10 p-2 text-white rounded-full bg-info-600" />

        <div className="flex-1 w-full">
          <h3 className="card-title hover:text-primary-550 hover:underline">
            <Link href={RepoData.repoURL} target="_blank">
              {RepoData.projectName}
            </Link>
          </h3>

          <p className="text-sm text-neutral-550">
            default branch: {RepoData.branch}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end ml-auto gap-x-6">
        <label className="text-base text-neutral-700 md:whitespace-nowrap">
          Auto Comment
        </label>

        <ToggleButton enabled={enabled} setEnabled={ToggleHandler} />
      </div>
    </div>
  );
};
