import { getServerSession } from "next-auth";
import { getCachedVideos } from "./utils/googleSheets";
import Home from "./components/Home";
import {Video} from './globals';
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/sign-in')
  }
  const videos: Video[] = await getCachedVideos();
  return (
    <Home videos={videos}/>
  )
}
