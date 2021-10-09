import React, { useRef } from 'react';
import UserProperties from './UserProperties';
import PersonalInfo from './PersonalInfo';
import NikkeiInfo from './NikkeiInfo';
import { useSession } from 'next-auth/client';
import Skeleton from 'react-loading-skeleton';
import useOnScreen from '@Components/Hooks/useOnScreen';
import EducationalProfile from './EducationalProfile';

const DashboardView = () => {
  const [session, loading] = useSession();

  const nikkeiRef = useRef();
  const nikkeiVisible = useOnScreen(nikkeiRef);

  return (
    <>
      <div className="w-full px-1 sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto pt-12 flex flex-col">
        <h1 className="text-4xl font-black inline-flex">
          <i className="ri-map-pin-user-fill mr-2 pb-4"></i> MEMBRO ASEBASE{' '}
          <em className="text-sm ml-1 font-extralight pt-1">v0.1</em>
        </h1>
        <UserProperties />
        {session && <PersonalInfo /> }
      </div>
      <div className="w-full">
        <div ref={nikkeiRef}>
          {session && !loading 
            ? <NikkeiInfo open={nikkeiVisible} />
            : <Skeleton className="w-full h-44" />
          }
        </div>
      </div>
      <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto pt-2 flex flex-col">
        <EducationalProfile />
      </div>
    </>
  );
};

export default DashboardView;