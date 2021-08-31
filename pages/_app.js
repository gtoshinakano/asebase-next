import Head from 'next/head'
import { Provider } from 'next-auth/client';
import '../styles/tailwind.css';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Head>
      <Provider
        options={{
          clientMaxAge: 0,
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
