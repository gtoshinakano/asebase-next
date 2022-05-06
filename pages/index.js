import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Layout from '@Components/Layouts/NotSignedCommon';
import AccessDenied from '@Views/AccessDenied';

export default function Page() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (status === 'authenticated') {
    return <Layout>{content || ''}</Layout>;
  }
  return (
    <Layout>
      <AccessDenied />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
