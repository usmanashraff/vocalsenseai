import TranscribeChild from "@/components/TranscribeChild";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export default async function TranscribePage() {
  const {isAuthenticated} = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  if(!isUserAuthenticated)
    redirect('/api/auth/login')
  
  


  return (
    <TranscribeChild />
  );
}
