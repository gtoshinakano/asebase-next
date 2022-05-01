import React from 'react';
import Layout from '@Components/Layouts/NotSignedCommon';
import SignIn from '@Views/SignIn';
import { getProviders, getSession, getCsrfToken } from 'next-auth/react';

export default function Page({ providers, csrfToken }) {
  // React.useEffect(() => {
  //    console.log(providers, csrfToken)
  // }, [])

  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <SignIn providers={providers} csrfToken={csrfToken} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession(context);
  if (session) {
    return {
      redirect: { destination: '/' }
    };
  }
  return {
    props: {
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}
