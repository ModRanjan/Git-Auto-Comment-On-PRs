import classNames from 'classnames';
import React from 'react';

interface StatsPropsData {
  title: string;
  value: number;
  bgcolor?: string;
}

export const Stat = ({ title, value, bgcolor }: StatsPropsData) => {
  return (
    <div
      className={classNames(
        'relative flex flex-col text-center sm:text-left justify-center h-24 px-4 rounded-md',
        bgcolor,
      )}
    >
      <span className="order-1 text-base font-normal text-neutral-700 font-Inter">
        {title}
      </span>

      <span className="order-2 mt-2 text-2xl font-semibold text-neutral-700 font-Epilogue">
        {value}
      </span>
    </div>
  );
};
