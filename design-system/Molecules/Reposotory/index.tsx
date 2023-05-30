import React, { FC, useState } from 'react';
import { BiGitRepoForked } from 'react-icons/bi';

import { ToggleButton } from '@/Atoms/Button/ToggleButton';
import { ReposType } from '@/types/Repos';
import Link from 'next/link';

interface RepositoryProps {
  repoId: number;
  repoURL: string;
  projectName: string;
  branch: string;
  autoComment: boolean;
  onClickHandler: (repoId: number) => void;
}

export const Repository: FC<RepositoryProps> = ({
  repoId,
  repoURL,
  projectName,
  branch,
  autoComment,
  onClickHandler,
}) => {
  const [toggle, setToggle] = useState<boolean>(autoComment);

  const ToggleButtonHandler = (repoId: number) => {
    onClickHandler(repoId);

    setToggle((prev) => !prev);
  };

  return (
    <div className="flex justify-between h-20 pt-2 pb-4 text-sm border-b border-neutral-300">
      <div className="flex items-center w-full gap-x-4">
        <BiGitRepoForked className="w-10 h-10 p-2 text-white rounded-full bg-info-600" />

        <div className="flex-1 w-full">
          <h3 className="card-title hover:text-primary-550 hover:underline">
            <Link href={repoURL} target="_blank">
              {projectName}
            </Link>
          </h3>

          <p className="text-sm text-neutral-550">default branch: {branch}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center ml-auto gap-y-1 md:justify-end md:flex-row gap-x-6">
        <label className="text-xs md:text-base text-neutral-700 whitespace-nowrap">
          Auto Comment
        </label>

        <ToggleButton
          enabled={toggle}
          setEnabled={() => ToggleButtonHandler(repoId)}
        />
      </div>
    </div>
  );
};
