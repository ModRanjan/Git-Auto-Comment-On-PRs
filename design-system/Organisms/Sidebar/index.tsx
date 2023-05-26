import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { AiOutlineLogout } from 'react-icons/ai';
import { Dialog, Transition } from '@headlessui/react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { XIcon } from '@/Atoms/Icon/CustomIcons';
import { SidebarNavigation } from '@/utils/config/SidebarNavigation';

import { useAppDispatch } from '@/redux/hooks';
import { setTotalRepos, setUser } from '@/redux/user/userSlice';

import { getUser } from '@/services/user';
import { UserType } from '@/types/User';
import { SidebarNavItemType } from '@/types/SidebarNavigation';
import { InternalLogo } from '@/design-system/Molecules/Logo';
import { Button } from '@/design-system/Atoms/Button';

const Sidebar = () => {
  const Router = useRouter();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<UserType>();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getUser();
        const { status, data } = response;
        if (status == 200) {
          const tempUserData = data.data;
          const totalRepos = tempUserData.public_repos;
          const user: UserType = {
            id: tempUserData.id,
            name: tempUserData.name,
            userName: tempUserData.userName,
            avatarUrl: tempUserData.avatar_url,
            email: tempUserData.email,
            href: tempUserData.repos_url,
            bio: tempUserData.bio,
            publicRepos: tempUserData.public_repos,
          };

          setUserData(user);
          dispatch(setUser(user));
          dispatch(setTotalRepos(totalRepos));
          console.log('object');
        }
      } catch (error) {
        console.log(error);
        toast.error(`getting user's Detail failed`);
      }
    };

    getUserDetails();
  }, []);

  const SidebarCloseHandler = () => {
    setSidebarOpen(false);
  };

  const logOut = () => {
    console.log('object');
    Router.push('/');
  };

  return (
    <div>
      <SideBarMobile
        isOpen={sidebarOpen}
        closeHandler={SidebarCloseHandler}
        SidebarNavigation={SidebarNavigation}
        userData={userData}
        logOutHandler={logOut}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden max-w-sm border-r md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col border-neutral-300">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-1 min-h-0 bg-white">
          <div className="flex flex-col flex-1 pt-4 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 gap-x-2">
              <Image
                width={24}
                height={24}
                className="w-auto h-11 backdrop-saturate-125"
                src="/GitAI.png"
                alt="Your Company"
              />

              <div>
                <h2 className="font-extrabold section-title font-Kalam">
                  GitAI
                </h2>
                <p className="-mt-1 text-sm font-light font-Kalam text-neutral-600">
                  Powered by AI
                </p>
              </div>
            </div>

            <nav className="flex flex-col px-4 mt-5 gap-y-3">
              {SidebarNavigation.map((item) => {
                const active = Router.pathname == item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    legacyBehavior
                    passHref
                  >
                    <a
                      className={classNames(
                        'group flex w-full items-center px-4 py-2 gap-x-2 text-sm rounded-[4px] justify-start whitespace-nowrap',
                        active
                          ? 'bg-primary-500 hover:bg-primary-200 hover:text-neutral-700 text-white font-semibold'
                          : 'text-neutral-600 hover:bg-primary-200 hover:text-neutral-700',
                      )}
                    >
                      <item.icon
                        fill="currentColor"
                        className={'w-6 h-6 text-xl'}
                      />

                      <span>{item.name}</span>
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="block w-full px-4 py-2 border-t border-neutral-300">
            <div className="flex-shrink-0 block p-2 border rounded-lg bg-neutral-100 border-neutral-200 group">
              <div className="relative flex items-center space-x-2">
                {userData?.avatarUrl ? (
                  <Image
                    src={userData?.avatarUrl}
                    className="inline-block rounded-full bg-secondary-200 h-11 w-11"
                    alt="?"
                    width={46}
                    height={46}
                    quality={100}
                  />
                ) : (
                  <span className="inline-block rounded-full bg-secondary-200 h-11 w-11"></span>
                )}

                <div className="flex-1">
                  <h2 className="card-title">{userData?.name}</h2>

                  <p className="text-xs font-light text-neutral-600">
                    {userData?.email || userData?.bio || userData?.userName}
                  </p>
                </div>

                <div className="relative flex justify-center -mr-2 group">
                  <button
                    onClick={logOut}
                    className="border-none rounded shadow-sm outline-none "
                  >
                    <AiOutlineLogout
                      className="border-none outline-none w-7 h-7 text-neutral-100"
                      stroke={'#9095a0'}
                      fill={'#9095a0'}
                    />
                  </button>

                  <span className="absolute top-0 p-2 text-xs text-white scale-0 bg-gray-800 rounded -right-16 group-hover:scale-100">
                    Log out
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-white md:pl-64">
        <div className="sticky top-0 z-10 flex items-center justify-between px-3 pt-4 md:hidden">
          <div className="-ml-4">
            <InternalLogo />
          </div>

          <Button
            type="button"
            className={classNames(
              'px-1.5 -mt-0.5 py-1 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-550',
              sidebarOpen && 'opacity-0',
            )}
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>

            <GiHamburgerMenu className="w-7 h-7" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

type SideBarMobileType = {
  isOpen: boolean;
  closeHandler: () => void;
  SidebarNavigation: SidebarNavItemType[];
  userData?: UserType;
  logOutHandler: () => void;
};

const SideBarMobile = ({
  isOpen,
  closeHandler,
  SidebarNavigation,
  userData,
  logOutHandler,
}: SideBarMobileType) => {
  const Router = useRouter();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={closeHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white text-neutral-900"
                    onClick={closeHandler}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-11 h-11" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <Image
                    width={24}
                    height={24}
                    className="w-auto h-11 backdrop-saturate-125"
                    src="/GitAI.png"
                    alt="Your Company"
                  />
                  <div>
                    <h2 className="font-extrabold section-title font-Kalam">
                      GitAI
                    </h2>
                    <p className="-mt-1 text-sm font-light font-Kalam text-neutral-600">
                      Powered by AI
                    </p>
                  </div>
                </div>
                <nav className="px-2 mt-5 space-y-1">
                  {SidebarNavigation.map((item) => {
                    const active = Router.pathname == item.href;
                    return (
                      <Link
                        passHref
                        key={item.name}
                        href={item.href}
                        legacyBehavior
                      >
                        <a
                          className={classNames(
                            'group flex items-center px-4 py-2 gap-x-2 text-sm rounded-md justify-start whitespace-nowrap',
                            item.current
                              ? 'bg-primary-500 hover:bg-primary-200 hover:text-neutral-700 text-white font-semibold'
                              : 'text-neutral-600 hover:bg-primary-200 hover:text-neutral-700',
                          )}
                        >
                          <item.icon
                            fill="currentColor"
                            className={'w-6 h-6 text-xl'}
                          />
                          <span>{item.name}</span>
                        </a>
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="block w-full p-2 border-t border-neutral-300">
                <div className="flex-shrink-0 block p-2 border rounded-lg bg-neutral-100 border-neutral-200 group">
                  <div className="relative flex items-center space-x-2">
                    {userData?.avatarUrl ? (
                      <Image
                        src={userData?.avatarUrl}
                        className="inline-block rounded-full bg-secondary-200 h-11 w-11"
                        alt="?"
                        width={46}
                        height={46}
                        quality={100}
                      />
                    ) : (
                      <span className="inline-block rounded-full bg-secondary-200 h-11 w-11"></span>
                    )}

                    <div className="flex-1">
                      <h2 className="card-title">{userData?.name}</h2>

                      <p className="text-xs font-light text-neutral-600">
                        {userData?.email || userData?.bio || userData?.userName}
                      </p>
                    </div>

                    <div className="relative flex justify-center group">
                      <button
                        onClick={logOutHandler}
                        className="text-xl rounded shadow-sm "
                      >
                        <AiOutlineLogout
                          className="border-none outline-none w-7 h-7 text-neutral-100"
                          stroke={'#9095a0'}
                          fill={'#9095a0'}
                        />
                      </button>

                      <span className="absolute p-2 text-xs text-white scale-0 bg-gray-800 rounded -right-14 top-10 group-hover:scale-100">
                        Log out
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
