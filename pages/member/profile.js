import Layout from '@Components/Layouts/MemberOnly';
import DashboardView from '@Components/Views/Profile';

import { getSession } from 'next-auth/react';

export default function Page() {
  return (
    <Layout title="Perfil de Bolsista">
      <div className="w-full min-h-screen flex flex-wrap flex-col font-notoJP text-gray-700 pb-40">
        <div className="h-64 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 print:hidden"></div>
        <DashboardView />
      </div>
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
