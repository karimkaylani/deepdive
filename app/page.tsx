import { getVideos } from "./actions";
import VideoGrid from "./components/VideoGrid";
import {Center, Flex, Title} from '@mantine/core';

export default async function Page() {
  const videos = await getVideos();
  return (
    <Center>
      <Flex className='mt-5' direction='column' gap='lg' w='90%' justify='center' align='center'>
        <Title ta='center' order={1}>The Deep Dive Searchable Database</Title>
        <VideoGrid videos={videos}/>
      </Flex>
    </Center>
  )

}
