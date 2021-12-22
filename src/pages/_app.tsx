import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SwrWrapper } from '../components/swr/SwrWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SwrWrapper>
      <Component {...pageProps} />;
    </SwrWrapper>
  );
}

export default MyApp;
