import * as React from 'react';
import classNames from 'classnames';

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={classNames(
          className ?? 'max-w-prose text-neutral-700 dark:text-slate-300',
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = 'Paragraph';
