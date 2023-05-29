import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiPlus, BiShareAlt } from 'react-icons/bi';

import { Stat } from '@/Atoms/Stat';
import { Button } from '@/Atoms/Button';
import ActivityFeed from '@/Molecules/ActivityFeed';
import CommitChart from '@/Organisms/CommitChart';

import { Page } from '@/redux/user/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCurrentPage, setPRStat } from '@/redux/user/userSlice';

import { getOpenedPR, getPRStats } from '@/services/prs';
import { pageTitle } from '@/utils/GeneralFunctions';

import { PRStatDataType } from '@/types/PRsData';
import { StatisticsType } from '@/types/Statistics';
import { ActivityFeedType } from '@/types/ActivityFeed';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [PRsData, setPRsData] = useState<ActivityFeedType[]>([]);
  const [prStatData, setPrStatData] = useState<StatisticsType[]>([
    {
      title: 'Repositories',
      value: 0,
      bgcolor: 'bg-secondary-200/30',
    },
    {
      title: 'Total PRs',
      value: 0,
      bgcolor: 'bg-[#c1c3ca]/30',
    },
    {
      title: 'Opened PRs',
      value: 0,
      bgcolor: 'bg-[#cbc5c1]/30',
    },
  ]);

  const totalPubRepos = useAppSelector((state) => state.user.totalRepos);

  // set Page-Title
  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.Dashboard;

      pageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await getPRStats();
        const { status, data } = response;

        if (status == 200) {
          const PRData = data.data;

          const ReqPrData: PRStatDataType = {
            totalPRs: PRData.totalPRs,
            totalOpenPRs: PRData.totalOpenPRs,
          };
          dispatch(setPRStat(ReqPrData));

          const stat = [
            {
              title: 'Repositories',
              value: totalPubRepos,
              bgcolor: 'bg-secondary-200/30' /* secondary-100 */,
            },
            {
              title: 'Total PRs',
              value: PRData.totalPRs,
              bgcolor: 'bg-[#c1c3ca]/30', // 'bg-[#F1F4FDFF]' /* tertiary1-100 */,
            },
            {
              title: 'Opened PRs',
              value: PRData.totalOpenPRs,
              bgcolor: 'bg-[#cbc5c1]/30', // 'bg-[#FEF6F1FF]' /* tertiary2-100 */,
            },
          ];
          setPrStatData(stat);
        }
      } catch (error) {
        toast.error('get repository stats error!');
      }
    };

    getStats();
  }, [totalPubRepos, dispatch]);

  useEffect(() => {
    const getOpenPRs = async () => {
      try {
        const response = await getOpenedPR();
        const { status, data } = response;

        if (status == 200) {
          const OpenedPRData = data.data;

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

          setPRsData(PRData);
        }
      } catch (error) {
        toast.error('get Opened PRs error!');
      }
    };

    getOpenPRs();
  }, []);

  return (
    <div className="w-full min-h-screen py-5 bg-white">
      {/* Page Header */}
      <div className="flex items-center justify-between px-4">
        <h1 className="page-title">Dashboard</h1>

        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => toast.warning('under-maintinace')}
            type="button"
            size={'slim'}
            className={`px-5 font-medium rounded-4px focus:outline-none focus:ring-0 focus:ring-offset-2`}
          >
            <BiPlus className="inline-block w-5 h-5" />
            <span className="hidden ml-2 md:inline-block">
              Create new project
            </span>
          </Button>

          <Button
            onClick={() => toast.warning('under-maintinace')}
            type="button"
            variant={'primary'}
            size={'slim'}
            className={`px-5 font-medium rounded-4px focus:outline-none focus:ring-0 focus:ring-offset-2`}
          >
            <BiShareAlt className="inline-block w-5 h-5" />
            <span className="hidden ml-2 md:inline-block">Share</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-6 sm:grid-cols-12">
        <div className="col-span-8 py-3 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-6">
          {/* Repo. Stats */}
          <div className="mx-auto mt-4 space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-5">
            {prStatData.map((stat, index) => {
              return (
                <Stat
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  bgcolor={stat.bgcolor}
                />
              );
            })}
          </div>

          {/*  Commit Activity */}
          <div className="px-5 py-5 mt-10 border rounded-4px sm:py-6 border-neutral-300 h-96">
            <CommitChart
              startDate={new Date('2023-04-21')}
              endDate={new Date('2023-04-27')}
            />
          </div>
        </div>

        {/* Activity feed */}
        <aside className="w-full col-span-4">
          <ActivityFeed ActivityData={PRsData} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
