import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../Sidebar';
import { getJWTToken } from '@/services/authentication';
import { useAppSelector } from '@/redux/hooks';

interface BaseLayoutProps {
  children: ReactNode;
}

const UnAuthenticated_Route = ['/', '/login'];

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const Router = useRouter();
  const hasUser = useAppSelector((state) => state.user);

  useEffect(() => {
    const { code } = Router.query;
    // console.log('Router.query: ', Router.query);
    const localStorage = window.localStorage.getItem('jwtToken');

    const setJWT = async (code: string) => {
      try {
        const response = await getJWTToken(code);
        const { status, data } = response;

        if (status == 200) {
          const jwt = data.data;

          window.localStorage.setItem('jwtToken', jwt);
        } else throw new Error('failed to get authentication token');
      } catch (error) {
        toast.error('set token error');
      }
    };

    if (!localStorage && code != undefined && typeof code === 'string') {
      setJWT(code);
    }
  }, [Router.query]);

  useEffect(() => {
    if (!hasUser) Router.push('/');
  }, [hasUser, Router]);

  return (
    <>
      <Head>
        <title>Git-PRs</title>
        <meta name="description" content="" />
        <link rel="icon" href="/GitAI.ico" />
      </Head>

      {UnAuthenticated_Route.includes(Router.asPath) ? (
        <>{children}</>
      ) : (
        <section className="relative">
          <Sidebar />

          <main className="flex-1">
            <div className="md:pl-64">{children}</div>
          </main>
        </section>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </>
  );
};

export default BaseLayout;
