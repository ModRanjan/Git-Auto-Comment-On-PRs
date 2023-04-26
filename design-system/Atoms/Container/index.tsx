import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(
        'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
