import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import '../styles/tailwind.css';
import '../styles/global.css';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider
          options={{
            clientMaxAge: 0,
            keepAlive: 0,
          }}
          session={pageProps.session}
        >
          <Component {...pageProps} />
          <ReactQueryDevtools position="bottom-right" />
        </Provider>
      </QueryClientProvider>
    </>
  );
}
