import { Button } from '@/design-system/Atoms/Button';
import { FC } from 'react';

interface prsProps {}

const prs: FC<prsProps> = ({}) => {
  return (
    <div className="w-full min-h-screen py-5 bg-white">
      {/* page header */}
      <div className="flex flex-col items-start justify-between px-4">
        <h1 className="text-2xl page-title">PRs</h1>

        <p className="-mt-2 text-base text-neutral-550">
          Dolor sunt non qui adiptsicing mollit add
        </p>
      </div>

      {/* PRs */}
      <div className="px-5 mt-10"></div>
    </div>
  );
};

export default prs;
