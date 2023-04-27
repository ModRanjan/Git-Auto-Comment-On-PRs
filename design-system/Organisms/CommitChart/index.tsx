import { FC, useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { getCommitData } from '@/services/commits';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface CommitChartProps {
  startDate: Date;
  endDate: Date;
}

const CommitChart: FC<CommitChartProps> = ({ startDate, endDate }) => {
  const [series, setSeries] = useState<number[]>([0, 2, 3, 1, 4, 0, 3]);

  const [option, setOption] = useState<ApexOptions>({
    chart: {
      id: 'commit-chart',
      fontFamily: 'Inter, sans-serif',
      foreColor: '#9095a0',
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
    },
    xaxis: {
      type: 'category',
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      position: 'bottom',
      labels: {
        show: true,
        showDuplicates: false,
        rotate: 20,
        style: {
          colors: '#9095a0',
          fontSize: '14px',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    // yaxis: {
    //   show: false,
    // },
    grid: {
      // padding: {
      //   left: 16,
      //   right: 4,
      // },
    },
    title: {
      text: 'Commit Activity',
      margin: 0,
      offsetX: -10,
      style: {
        fontSize: '18px',
        fontWeight: 800,
        fontFamily: 'Epilogue, sans-serif',
        color: '#171A1F',
      },
    },
  });

  useEffect(() => {
    const getCommitGraphData = async () => {
      const XAxisData: any[] = [];
      const seriesData: number[] = [];

      try {
        const response = await getCommitData(startDate, endDate);
        const { status, data } = response;

        if (status == 200) {
          const CommitsData = data.data;

          CommitsData.map((commitData: any) => {
            XAxisData.push(
              new Date(commitData.commitDate).toString().slice(0, 4),
            );
            seriesData.push(commitData.commitCount);
          });

          console.log(`XAxisData: ${XAxisData}
                    chartData: ${seriesData}`);

          const Options: ApexOptions = {
            ...option,
            xaxis: {
              type: 'category',
              categories: XAxisData,
              position: 'bottom',
              // max: 7,
              // min: 7,
              labels: {
                show: true,
                showDuplicates: false,
                rotate: 20,
                style: {
                  colors: '#9095a0',
                  fontSize: '14px',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-label',
                },
              },
            },
            // yaxis: {
            //   show: false,
            // },
            // grid: {
            // padding: {
            //   left: 16,
            //   right: 4,
            // },
            // },
          };

          setOption(Options);
          setSeries(seriesData);
        }
      } catch (error) {
        console.log(error);
        toast.error('get commit data failed');
      }
    };
    getCommitGraphData();
  }, []);

  return (
    <ReactApexChart
      type="line"
      height={340}
      width={'100%'}
      series={[
        {
          name: 'Number of Commits',
          data: series,
        },
      ]}
      options={option}
    />
  );
};

export default CommitChart;
