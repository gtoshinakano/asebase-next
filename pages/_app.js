import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/tailwind.css';
import '../styles/global.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          staleTime={0}
          refetchInterval={0}
          session={pageProps.session}
        >
          <Component {...pageProps} />
          <ReactQueryDevtools position="bottom-right" />
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
