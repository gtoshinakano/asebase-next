import Layout from '@Components/Layouts/MemberOnly';
import { getSession } from 'next-auth/client';
import DashboardView from '@Components/Views/Dashboard';

export default function Page({session}) {
  return (
    <Layout title="Perfil de Bolsista">
      <div className="w-full min-h-screen flex flex-wrap flex-col font-noto text-gray-700">
        <div className="h-64 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
        <DashboardView />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session: session,
    }
  }
}