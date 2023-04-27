import { StatisticsType } from '@/types/Statistics';

export const PRStatData = (
  totalPubRepos: number,
  totalPRs: number,
  totalOpenPRs: number,
): StatisticsType[] => {
  return [
    {
      title: 'Repositories',
      value: totalPubRepos,
      bgcolor: 'bg-secondary-200/30' /* secondary-100 */,
    },
    {
      title: 'Total PRs',
      value: totalPRs,
      bgcolor: 'bg-[#c1c3ca]/30', // 'bg-[#F1F4FDFF]' /* tertiary1-100 */,
    },
    {
      title: 'Opened PRs',
      value: totalOpenPRs,
      bgcolor: 'bg-[#cbc5c1]/30', // 'bg-[#FEF6F1FF]' /* tertiary2-100 */,
    },
  ];
};
