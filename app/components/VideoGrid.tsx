import React from 'react'
import { Video } from '../globals'
import { SimpleGrid } from '@mantine/core';
import VideoCard from './VideoCard';

export interface VideoGridProps {
    videos: Video[];
}

const VideoGrid = ({videos}: VideoGridProps) => {
  return (
    <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 4, lg: 5 }}>
        {videos.map((video, index) => 
            <VideoCard key={index} video={video}/>
        )}
    </SimpleGrid>
  )
}

export default VideoGrid