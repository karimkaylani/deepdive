import React, { useContext } from 'react'
import { Filters, RuntimeFilter, Video } from '../globals'
import { SimpleGrid, Stack, Text } from '@mantine/core';
import VideoCard from './VideoCard';
import { FilterContext } from './Home';

export interface VideoGridProps {
    videos: Video[];
}

export const getAllGenres = (videos: Video[]) => {
  const genres = new Set<string>();
  videos.forEach(video => video.genre.forEach(g => g!== 'N/A' && genres.add(g)));
  return Array.from(genres).sort();
}

const runtimeToMinutes = (runtime: string) => {
  const [hours, minutes, seconds] = runtime.split(':');
  return parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
}

const shouldShowVideo = (vid: Video, filters: Filters) => {

  if (filters.search !== '' && (
    !vid.title.toLowerCase().includes(filters.search.toLowerCase()) &&
    !vid.creator.toLowerCase().includes(filters.search.toLowerCase()) &&
    !vid.genre.some(g => g.toLowerCase().includes(filters.search.toLowerCase())))) {
    return false;
  }
  for (const genre of filters.genres) {
    if (!vid.genre.includes(genre)) {
      return false;
    }
  }
  if (filters.yearsRecommended.length > 0 && !filters.yearsRecommended.includes(parseInt(vid.yearRecommended))) {
    return false;
  }
  const lengthInMinutes = runtimeToMinutes(vid.length);
  if (filters.runtime !== RuntimeFilter.All) {
    if (filters.runtime === RuntimeFilter.Short && lengthInMinutes > 15) {
      return false;
    }
    if (filters.runtime === RuntimeFilter.Medium && (lengthInMinutes <= 15 || lengthInMinutes > 45)) {
      return false;
    }
    if (filters.runtime === RuntimeFilter.Long && lengthInMinutes <= 45) {
      return false;
    }
  }
  return true;
}

export const getFilteredVideos = (videos: Video[], filters: Filters) => {
  return videos.filter(video => shouldShowVideo(video, filters));
}

const VideoGrid = ({videos}: VideoGridProps) => {
  const {filters} = useContext(FilterContext);
  const filteredVideos = getFilteredVideos(videos, filters);
  return (
    <Stack>
      <Text>Found {filteredVideos.length} videos</Text>
      <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, lg: 4 }}>
          {filteredVideos.map((video) => 
              <VideoCard key={video.title} video={video}/>
          )}
      </SimpleGrid>
    </Stack>
  )
}

export default VideoGrid