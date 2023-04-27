import { Card } from '@/design-system/Atoms/Card';
import { FC } from 'react';
import { ActivityFeedType } from '@/types/ActivityFeed';

interface ActivityFeedProps {
  ActivityData: ActivityFeedType[];
}

const ActivityFeed: FC<ActivityFeedProps> = ({ ActivityData }) => {
  return (
    <div className="px-4 overflow-hidden lg:flex-shrink-0">
      <div className="lg:w-lg">
        <div className="pt-8 pb-2">
          <h2 className="section-title">Activities</h2>
        </div>

        <div>
          <ul
            role="list"
            className="flex flex-col overflow-y-auto gap-y-3 scroll-smooth"
          >
            {ActivityData.map((item, index) => (
              <Card
                key={item.commit + index}
                imgSrc={item.avtarUrl}
                iHeight="h-11"
                iWidth="w-11"
                title={item.project}
                subTitle="company@Example.com"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
