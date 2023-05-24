import { FC, useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { getCommitData } from '@/services/commits';
import { getPastDate, getPastDates } from '@/utils/GeneralFunctions';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface CommitChartProps {
  startDate: Date;
  endDate: Date;
}

const CommitChart: FC<CommitChartProps> = ({ startDate, endDate }) => {
  const [series, setSeries] = useState([0, 0, 0, 0, 0, 0, 0]);
  // [1, 2, 3, 1, 4, 0, 3]

  const [option, setOption] = useState<ApexOptions>({
    chart: {
      id: 'commit-chart',
      fontFamily: 'Inter, sans-serif',
      foreColor: '#9095a0',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
        },
      },
    },
    markers: {
      size: 4,
    },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      position: 'bottom',
      tickPlacement: 'on',
      categories: getPastDates(7),
      labels: {
        // format: 'dd MMM',
        show: true,
        showDuplicates: false,
        style: {
          colors: '#9095a0',
          fontSize: '14px',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-label',
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    yaxis: {
      // min: 0,
      // max: 10,
      floating: false,
      logarithmic: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: false,
        color: '#247BA0',
      },
      labels: {
        style: {
          colors: '#262626',
        },
      },
      title: {
        text: 'Number of Commits',
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, Arial, sans-serif',
          fontWeight: 600,
          color: '#1091f4',
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
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
      const [today, pastDate] = getPastDate(7);

      try {
        // const response = await getCommiata(startDate, endDate);
        const response = await getCommitData(today, pastDate);
        const { status, data } = response;

        if (status == 200) {
          const CommitsData = data.data;

          if (CommitsData.length > 0) {
            CommitsData.map((commitData: any) => {
              XAxisData.push(
                new Date(commitData.commitDate).toString().slice(0, 10),
              );
              seriesData.push(commitData.commitCount);
            });

            console.log(`XAxisData: ${XAxisData} chartData: ${seriesData}`);

            const Options: ApexOptions = {
              ...option,
              xaxis: {
                ...option.xaxis,
                categories: XAxisData,
              },
            };

            setOption(Options);
            setSeries(seriesData);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('get commit data failed');
      }
    };
    getCommitGraphData();
  }, [option]);

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
