import React, { useContext } from 'react'
import { Filters, RecentFilter, RuntimeFilter, Sort, SortAttribute, SortOrder, Video } from '../globals'
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
  if (filters.runtime !== RuntimeFilter.Any) {
    if (filters.runtime === RuntimeFilter.Short && lengthInMinutes > 20) {
      return false;
    }
    if (filters.runtime === RuntimeFilter.Medium && (lengthInMinutes <= 20 || lengthInMinutes > 45)) {
      return false;
    }
    if (filters.runtime === RuntimeFilter.Long && lengthInMinutes <= 45) {
      return false;
    }
  }

  if (filters.recent !== RecentFilter.Any) {
    const videoDate = new Date(vid.date);
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    if (filters.recent === RecentFilter.Short && videoDate < new Date(now.getTime() - 30 * oneDay)) {
      return false;
    }
    if (filters.recent === RecentFilter.Medium && videoDate < new Date(now.getTime() - 180 * oneDay)) {
      return false;
    }
    if (filters.recent === RecentFilter.Long && videoDate < new Date(now.getTime() - 365 * oneDay)) {
      return false;
    }
  }
  return true;
}

const sortVideos = (videos: Video[], sort: Sort) => {

  if (sort.sort === SortAttribute.DateRecommended) {
    if (sort.order === SortOrder.Ascending) {
      return videos.reverse()
    } else {
      return videos
    }
  }

  return videos.sort((a, b) => {
    if (sort.sort === SortAttribute.Title) {
      return sort.order === SortOrder.Ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    }
    if (sort.sort === SortAttribute.Creator) {
      return sort.order === SortOrder.Ascending ? a.creator.localeCompare(b.creator) : b.creator.localeCompare(a.creator);
    }
    if (sort.sort === SortAttribute.Runtime) {
      return sort.order === SortOrder.Ascending ? runtimeToMinutes(a.length) - runtimeToMinutes(b.length) : runtimeToMinutes(b.length) - runtimeToMinutes(a.length);
    }
    if (sort.sort === SortAttribute.DatePosted) {
      return sort.order === SortOrder.Ascending ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

export const getFilteredVideos = (videos: Video[], filters: Filters) => {
  return videos.filter(video => shouldShowVideo(video, filters));
}

const VideoGrid = ({videos}: VideoGridProps) => {
  const {filters: {filters}, sort: {sort}} = useContext(FilterContext);
  const filteredVideos = getFilteredVideos(videos, filters);
  const sortedVideos = sortVideos(filteredVideos, sort);
  return (
    <Stack>
      <Text>Found {filteredVideos.length} videos</Text>
      <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, lg: 4 }}>
          {sortedVideos.map((video) => 
              <VideoCard key={video.title} video={video}/>
          )}
      </SimpleGrid>
    </Stack>
  )
}

export default VideoGrid