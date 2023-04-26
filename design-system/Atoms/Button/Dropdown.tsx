import React, { FC } from 'react';

import classNames from 'classnames';

interface IDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  dropdownOnClick?: () => void;
  disabled?: boolean;
}
export const DropdownMenu: FC<IDropdownProps> = (
  { dropdownOnClick, className, disabled, children, ...props },
  ref,
) => {
  const BaseStyle =
    'flex flex-col cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm font-medium outline-none focus:bg-slate-100 dark:focus:bg-slate-700';

  return (
    <div className={classNames('relative', className ?? BaseStyle)} {...props}>
      {children}
    </div>
  );
};

interface IDropdownMenuLabel extends React.HTMLAttributes<HTMLButtonElement> {}
export const DropdownMenuLabel: FC<IDropdownMenuLabel> = ({
  className,
  ...props
}) => {
  const BaseStyle =
    'z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-100 bg-white p-1 text-slate-700 shadow-md animate-in';

  return (
    <button
      // ref={ref}
      className={classNames(className ?? BaseStyle)}
      {...props}
    ></button>
  );
};

interface IDropdownMenuContent extends React.HTMLAttributes<HTMLDivElement> {
  isExpanded: boolean;
}
export const DropdownMenuContent: FC<IDropdownMenuContent> = ({
  isExpanded,
  className,
  ...props
}) =>
  // ref,
  {
    const BaseStyle =
      'z-50 min-w-xs w-36 w-full overflow-hidden rounded-md border border-slate-100 bg-white text-slate-700 shadow-md animate-in';

    return (
      <div
        //  'absolute -bottom-10',
        className={classNames(
          'absolute bottom-0',
          isExpanded ? 'visible' : 'hidden',
          className ?? BaseStyle,
        )}
        {...props}
      />
    );
  };

interface IDropdownMenuItem
  extends React.HTMLAttributes<HTMLLinkElement | HTMLSpanElement> {}

export const DropdownMenuItem = ({
  className,
  ...props
}: IDropdownMenuItem) => {
  const BaseStyle =
    'px-4 py-2 pr-4 text-xs font-normal text-left text-gray-700 cursor-pointer hover:bg-gray-300 list-none';

  return <li {...props} className={classNames(className ?? BaseStyle)} />;
};

/** Dropdown Use Case
 * <div class="relative inline-block text-left">
  <div>
    <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Options
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
  <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
      </form>
    </div>
  </div>
</div>
*/

/** 
 * https://www.youtube.com/watch?v=kLQNruAH1rI&t=1335s
 * <DropdownMenu>
              <DropdownMenuLabel
                className="relative px-4 py-2.5 bg-white"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                connect
              </DropdownMenuLabel>

              <DropdownMenuContent isExpanded={isExpanded} className="bg-black">
                <DropdownMenuItem className="flex items-center px-4 py-2 pr-4 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-300">
                  <li className="px-4 py-2 pr-4 text-xs font-normal text-left text-gray-700 list-none cursor-pointer hover:bg-gray-300">
                    a
                  </li>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center px-4 py-2 pr-4 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-300">
                  <li className="px-4 py-2 pr-4 text-xs font-normal text-left text-gray-700 list-none cursor-pointer hover:bg-gray-300">
                    a
                  </li>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center px-4 py-2 pr-4 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-300">
                  <li className="px-4 py-2 pr-4 text-xs font-normal text-left text-gray-700 list-none cursor-pointer hover:bg-gray-300">
                    a
                  </li>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
 */
