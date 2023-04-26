import { ButtonHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import classNames from 'classnames';

export const ButtonVariants = cva(
  'relative inline-flex items-center justify-center z-10 whitespace-nowrap font-Inter',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-250 hover:bg-neutral-300 active:bg-neutral-350 text-neutral-600 border border-neutral-300',
        primary:
          'bg-primary-500 hover:bg-primary-550 active:bg-primary-600 text-white border border-current',
        destructive: 'bg-destructive text-black',
      },
      modifier: {
        outline: 'bg-transparent border border-current shadow-md',
        plain: 'shadow-none bg-transparent border-none px-2 py-1 text-sm',
      },
      size: {
        slim: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'bg-neutral-100 text-neutral-500',
      },
    },
    compoundVariants: [
      {
        modifier: 'outline',
        variant: 'destructive',
        className: 'text-destructive',
      },
      {
        modifier: 'outline',
        variant: 'primary',
        className: 'text-primary',
      },
      {
        modifier: 'plain',
        variant: 'destructive',
        className: 'text-destructive',
      },
      {
        modifier: 'plain',
        variant: 'primary',
        className: 'text-primary',
      },
      {
        modifier: undefined,
        size: 'slim',
        className: 'px-3 py-2',
      },
      {
        modifier: undefined,
        size: 'medium',
        className: 'px-4 py-2',
      },
      {
        modifier: undefined,
        size: 'large',
        className: 'px-6 py-2',
      },
      {
        modifier: 'outline',
        size: 'slim',
        className: 'px-3 py-2',
      },
      {
        modifier: 'outline',
        size: 'medium',
        className: 'px-4 py-2',
      },
      {
        modifier: 'outline',
        size: 'large',
        className: 'px-6 py-3',
      },
      {
        disabled: true,
        variant: 'default',
        className: 'border-neutral-300',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  },
);
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof ButtonVariants> {
  isLoading?: boolean;
}

export const Button = ({
  className,
  children,
  variant,
  modifier,
  size,
  fullWidth,
  disabled,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        ButtonVariants({
          variant,
          modifier,
          size,
          fullWidth,
          disabled,
        }),
        className,
      )}
      {...props}
    >
      <span className={`${isLoading ? 'text-transparent' : ' '}`}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute block w-4 h-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <svg
            className="text-current animate-spin"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-current"
              d="M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
            ></path>
          </svg>
          <span className="sr-only">Loading</span>
        </span>
      )}
    </button>
  );
};
