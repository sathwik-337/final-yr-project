"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from '@/context/UserDetailContext';
import CookieBanner from './_shared/CookieBanner';

function Provider({ children }: any) {
  const { isLoaded, isSignedIn } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      CreateNewUser();
    }
  }, [isLoaded, isSignedIn]);

  const CreateNewUser = async () => {
    const result = await axios.post('/api/user', {});
    setUserDetail(result.data.user);
  }
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>
        {children}
        <CookieBanner />
      </div>
    </UserDetailContext.Provider>
  )
}

export default Provider;
