'use client'
import { createContext, useState } from 'react';
import SearchFilter from "./SearchFilter";
import VideoGrid, { getAllGenres, getFilteredVideos } from "./VideoGrid";
import {Center, Flex, Title} from '@mantine/core';
import { Filters, RuntimeFilter, Video } from "../globals";

export interface MainProps {
    videos: Video[];
}

export interface iFilterContext {
  filters: Filters,
  setFilters: (filters: Filters) => void
}

let defaultFilters: Filters = {
  search: '',
  genres: [],
  yearsRecommended: [],
  runtime: RuntimeFilter.All
}

export const FilterContext = createContext<iFilterContext>({
  filters: defaultFilters,
  setFilters: () => {}
})

const Home = ({videos}: MainProps) => {
    const [filters, setFilters] = useState<Filters>({
      search: '',
      genres: [],
      yearsRecommended: [],
      runtime: RuntimeFilter.All
    });
    return (
    <Center>
        <Flex className='mt-5' direction='column' gap='lg' w='90%' justify='center' align='center'>
        <Title ta='center' order={1}>The Deep Dive Searchable Playlist</Title>
        <FilterContext.Provider value={{filters, setFilters}}>
            <SearchFilter allGenres={getAllGenres(getFilteredVideos(videos, filters))}/>
            <VideoGrid videos={videos}/>
        </FilterContext.Provider>
        </Flex>
    </Center>
    )
}

export default Home