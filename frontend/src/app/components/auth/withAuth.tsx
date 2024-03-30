'use client'
import useAuth from '@/app/utils/useAuth';

export default function WithAuth({children,}: {children: React.ReactNode;}) {
    const is_Authenticated = useAuth();
    return (
      <>
        {is_Authenticated && (children)}     
      </>
    );
  }