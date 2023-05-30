/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@/Atoms/Button';
import { Paragraph } from '@/Atoms/Paragraph';
import { GitHubIcon } from '@/Atoms/Icon/CustomIcons';

import { Logo } from '@/Molecules/Logo';

import { Page } from '@/redux/user/types';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentPage } from '@/redux/user/userSlice';

import { pageTitle } from '@/utils/GeneralFunctions';
import { getJWTToken, signInOrSignUp } from '@/services/authentication';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Login() {
  const Router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (document) {
      const currentPageTitle = Page.LandingPage;

      pageTitle(currentPageTitle);
      dispatch(setCurrentPage(currentPageTitle));
    }
  });

  const loginWithGithub = async () => {
    try {
      await signInOrSignUp();
    } catch (error: any) {
      console.log('login error: ', error);
      toast.error(error);
    }
  };

  useEffect(() => {
    const { code } = Router.query;

    const localStorage = window.localStorage.getItem('jwtToken');
    console.log('localStorage: ', localStorage);

    const setJWT = async (code: string) => {
      try {
        const response = await getJWTToken(code);
        const { status, data } = response;

        if (status == 200) {
          const jwt = data.data;

          window.localStorage.setItem('jwtToken', jwt);

          Router.push('/dashboard');
        } else throw new Error('failed to get authentication token');
      } catch (error) {
        toast.error('set token error');
      }
    };

    if (code != undefined && typeof code === 'string') {
      if (!localStorage) {
        setJWT(code);
      } else Router.push('/dashboard');
    }
  }, [Router]);

  return (
    <div className="relative h-screen overflow-hidden bg-secondary-300">
      <div className="absolute rounded-full -start-2/4 md:-inset-x-1/4 -top-20 md:h-[34rem] md:w-[34rem] h-[20rem] w-[20rem] bg-secondary-500 opacity-25" />
      <div className="absolute rounded-full md:-right-32 -top-1/4 -right-2/4 md:h-[24rem] md:w-[24rem] h-[18rem] w-[18rem] bg-secondary-500 opacity-25" />
      <div className="fixed rounded-md h-[153px] max-w-2xl w-full inset-x-2/4 -bottom-6  bg-secondary-500 opacity-25" />

      <div className="relative pt-5 pb-16 sm:pb-24">
        <nav className="relative flex items-center px-4 mx-auto max-w-7xl sm:px-6">
          <div className="flex items-center justify-between flex-1 w-full">
            <div className="-ml-2">
              <Logo />
            </div>

            <Button
              variant={'primary'}
              onClick={loginWithGithub}
              type="button"
              className="ml-auto font-semibold border-none rounded-lg justify-self-end focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              Get Started
            </Button>
          </div>
        </nav>

        <main className="h-screen pt-10 mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 text-center sm:px-6 md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
              <div>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-5xl font-Epilogue">
                  Summarize
                  <span className="block text-transparent bg-gradient-to-r from-primary-300 via-primary-450 to-primary-200 bg-clip-text">
                    Your Git PRs with
                  </span>{' '}
                  Our GitAI
                </h1>

                <Paragraph className="mt-4 text-base prose lg:leading-7 text-neutral-300 sm:mt-5 sm:text-xl md:text-lg lg:text-xl">
                  The easiest way to streamline your Git workflow. Increase
                  productivity with our powerful Git automation tool. Spend less
                  time on tedious Git tasks and more time coding.
                </Paragraph>

                <div className="w-full mt-8 sm:mx-auto sm:max-w-lg lg:ml-0">
                  <div className="flex flex-wrap items-start justify-center lg:justify-start">
                    <Button
                      variant={'primary'}
                      size={'large'}
                      onClick={loginWithGithub}
                      type="button"
                      className="font-bold border-none rounded-lg focus:outline-none focus:ring-0 focus:ring-offset-0"
                    >
                      Login with GitHub{' '}
                      <GitHubIcon className="inline-block w-6 h-6 ml-1" />
                    </Button>

                    <div className="p-4">
                      <Paragraph className="text-xs text-neutral-900">
                        By signing up, you agree to our{' '}
                        <a href="#" className="font-semibold hover:underline">
                          Terms
                        </a>
                        ,{' '}
                        <a href="#" className="font-semibold hover:underline">
                          Data Policy
                        </a>{' '}
                        and{' '}
                        <a href="#" className="font-semibold hover:underline">
                          Cookies Policy
                        </a>
                        .
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden mt-16 md:block sm:mt-24 lg:col-span-6 lg:mt-0">
              <Image
                src="/profiles/J1.jpg"
                alt="J1.jpg"
                className="absolute w-24 h-24 rounded-full top-16 left-16 bg-primary-200"
                width={124}
                height={124}
                quality={100}
              />

              <Image
                src="/profiles/E1.jpg"
                alt="E1.jpg"
                className="absolute rounded-full w-14 h-14 top-4 right-48 bg-[#C5D1F7]"
                width={88}
                height={88}
                quality={100}
              />
              <Image
                src="/profiles/G1.jpg"
                className="absolute rounded-full w-14 h-14 top-64 right-64 bg-secondary-200"
                alt=""
                width={84}
                height={84}
                quality={100}
              />

              <div className="sm:mx-auto sm:w-full sm:max-w-lg sm:overflow-hidden">
                <Image
                  src="/login-bg.svg"
                  alt="login-bg.svg"
                  width={637}
                  height={760}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
