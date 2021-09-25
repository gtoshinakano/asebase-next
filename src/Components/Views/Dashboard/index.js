import React from 'react';
import UserProperties from './UserProperties'
import PersonalInfo from './PersonalInfo';
import { useSession } from 'next-auth/client';
import Skeleton from 'react-loading-skeleton';

const DashboardView = () => {

  const session = useSession()

  return(
    <div className="w-full px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 flex-grow mx-auto pt-12 flex flex-col">
      <h1 className="text-4xl font-black inline-flex"><i className="ri-map-pin-user-fill mr-2 pb-4"></i> MEMBRO ASEBASE <em className="text-sm ml-1 font-extralight pt-1">v0.1</em></h1>
      <UserProperties />
      {session ? <PersonalInfo /> : <Skeleton className="w-full h-6" />}
    </div>
  )

}

export default DashboardView;
