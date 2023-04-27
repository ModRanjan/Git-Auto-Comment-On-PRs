import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import BaseLayout from '@/Organisms/Layouts';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Provider>
  );
}
