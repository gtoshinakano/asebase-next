import React, { useRef } from 'react';
import UserProperties from './UserProperties';
import PersonalInfo from './PersonalInfo';
import NikkeiInfo from './NikkeiInfo';
import { useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';
import useOnScreen from '@Components/Hooks/useOnScreen';
import AcademicProfile from './AcademicProfile';
import ExchangeInfo from './ExchangeInfo';
import ProfessionalInfo from './ProfessionalProfile';

const DashboardView = () => {
  const {status} = useSession();
  const loading = status === "loading"
  const isAuth = status === "authenticated"

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
        {isAuth && <PersonalInfo />}
      </div>
      <div className="w-full">
        <div ref={nikkeiRef}>
          {isAuth && !loading ? (
            <NikkeiInfo open={nikkeiVisible} />
          ) : (
            <Skeleton className="w-full h-44" />
          )}
        </div>
      </div>
      <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto pt-2 flex flex-col">
        {isAuth && !loading ? (
          <AcademicProfile />
        ) : (
          <Skeleton className="w-full h-44" />
        )}
      </div>
      <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto pt-2 flex flex-col">
        <ProfessionalInfo />
      </div>
      <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-1/2 mx-auto pt-2 flex flex-col">
        <ExchangeInfo />
      </div>
    </>
  );
};

export default DashboardView;
