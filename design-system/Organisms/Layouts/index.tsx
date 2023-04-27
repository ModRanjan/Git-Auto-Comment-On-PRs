import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../Sidebar';
import { getJWTToken } from '@/services/authentication';

interface BaseLayoutProps {
  children: ReactNode;
}

const UnAuthenticated_Route = ['/', '/login'];

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const Router = useRouter();
  useEffect(() => {
    const { code } = Router.query;

    const setJWT = async (code: string) => {
      try {
        const response = await getJWTToken(code);
        const { status, data } = response;
        if (status == 200) {
          const jwt = data.data;
          console.log('jwt: ', jwt);
          window.localStorage.setItem('jwtToken', jwt);
        } else throw new Error('failed to get authentication token');
      } catch (error) {
        console.log(error);
        toast.error('set token error');
      }
    };

    if (code != undefined && typeof code === 'string') {
      setJWT(code);
    }
  }, [Router.query]);

  return (
    <>
      <Head>
        <title>Git-PRs</title>
        <meta name="description" content="" />
        <link rel="icon" href="/eventr.ico" />
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
