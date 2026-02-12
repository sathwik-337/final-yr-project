"use client"
import React, { useEffect } from 'react'
import axios from 'axios';
import { useUser } from "@clerk/nextjs";

function Provider({ children }: any) {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      CreateNewUser();
    }
  }, [isLoaded, isSignedIn]);

  const CreateNewUser = async () => {
    const result = await axios.post('/api/user', {});
    console.log(result.data);
  }
  return (
    <div>{children}</div>
  )
}

export default Provider;
