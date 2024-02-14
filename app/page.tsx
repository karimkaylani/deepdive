import { getCachedVideos } from "./actions";
import Home from "./components/Home";
import {Video} from './globals';

export default async function Page() {
  const videos: Video[] = await getCachedVideos();
  return (
    <Home videos={videos}/>
  )
}
