import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getPROpen } from '@/services/prs';
import { ActivityFeedType } from '@/types/ActivityFeed';
import { useAppDispatch } from '@/redux/hooks';
import { Page } from '@/redux/user/types';
import { pageTitle } from '@/utils/GeneralFunctions';
import { setCurrentPage } from '@/redux/user/userSlice';
import PRs from '@/Organisms/PRs';

const OpenPRs = () => {
  const dispatch = useAppDispatch();
  const [PRsData, setPRsData] = useState<ActivityFeedType[]>([]);

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.Prs;

      pageTitle(currentPageTitle);

      dispatch(setCurrentPage(currentPageTitle));
    }
  }, [dispatch]);

  useEffect(() => {
    const getOpenPRs = async () => {
      try {
        const response = await getPROpen();
        const { status, data } = response;

        if (status == 200) {
          const OpenedPRData = data.data;
          console.log('OpenedPRData response: ', OpenedPRData);
          const PRData: ActivityFeedType[] = [];

          OpenedPRData.map((PR: any) => {
            const ReqPrData: ActivityFeedType = {
              repoId: PR.repoId,
              repoTitle: PR.base.repo.name,
              PRId: PR.id,
              PRTitle: PR.raw_data.title,
              html_url: PR.raw_data.html_url,
              changed_files: PR.raw_data.changed_files,
              status: PR.state,
              from_branch: PR.raw_data.head.ref,
              to_branch: PR.base.ref,
              numberOfPRs: PR.number,
              numberOfCommits: PR.raw_data.commits,
              user_avatar: PR.raw_data.user.avatar_url,
              userId: PR.raw_data.user.id,
            };

            PRData.push(ReqPrData);
          });

          console.log('PRData: ', PRData);
          setPRsData(PRData);
        }
      } catch (error) {
        console.log(error);
        toast.error('get Opened PRs error!');
      }
    };

    getOpenPRs();
  }, []);
  return (
    <div className="w-full min-h-screen py-5 bg-white">
      {/* page header */}
      <div className="flex flex-col items-start justify-between px-4">
        <h1 className="text-2xl page-title">Pull Requests</h1>

        <p className="-mt-2 text-base text-neutral-550">
          Elevate your collaboration and code quality with Pull Requests
        </p>
      </div>

      {/* PRs */}
      <div className="px-5 mt-10">
        {PRsData.map((PR) => {
          return (
            <PRs
              key={PR.PRId}
              repoTitle={PR.repoTitle}
              PRId={PR.PRId}
              PRTitle={PR.PRTitle}
              html_url={PR.html_url}
              changed_files={PR.changed_files}
              status={PR.status}
              from_branch={PR.from_branch}
              to_branch={PR.to_branch}
              numberOfPRs={PR.numberOfPRs}
              numberOfCommits={PR.numberOfCommits}
              user_avatar={PR.user_avatar ?? ''}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OpenPRs;
