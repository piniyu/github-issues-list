'use client'
import {headers} from 'next/headers'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";



export function Providers({ children,session }: { children: ReactNode,session:Session|null }) {
  
  return (
    <SessionProvider session={session}>
        {children}
 </SessionProvider>
      
   
  );
}
