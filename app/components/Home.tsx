'use client'
import { createContext, useState } from 'react';
import SearchFilterSort from "./SearchFilterSort";
import VideoGrid, { getAllGenres, getFilteredVideos } from "./VideoGrid";
import {Center, Flex, Title, Image} from '@mantine/core';
import { Filters, RecentFilter, RuntimeFilter, Sort, SortAttribute, SortOrder, Video, secondaryColor } from "../globals";

export interface MainProps {
    videos: Video[];
}

export interface iFilterContext {
  filters: {filters: Filters, setFilters: (filters: Filters) => void},
  sort: {sort: Sort, setSort: (sortAttribute: Sort) => void}
}

let defaultFilters: Filters = {
  search: '',
  genres: [],
  runtime: RuntimeFilter.Any,
  recent: RecentFilter.Any
}

let defaultSort: Sort = {
  sort: SortAttribute.DateRecommended,
  order: SortOrder.Descending
}

export const FilterContext = createContext<iFilterContext>({
  filters: {filters: defaultFilters, setFilters: () => {}},
  sort: {sort: defaultSort, setSort: () => {}}
})

const Home = ({videos}: MainProps) => {
    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [sort, setSort] = useState<Sort>(defaultSort);
    return (
    <Center>
        <Flex className='mt-5 mb-5' direction='column' gap='lg' w='90%' justify='center' align='center'>
        <Image src={'logo.png'} w={150}/>
        <Title ta='center' c={secondaryColor} fw={650} order={1}>SEARCHABLE PLAYLIST</Title>
        <FilterContext.Provider value={{filters: {filters, setFilters}, sort: {sort, setSort}}}>
            <SearchFilterSort allGenres={getAllGenres(getFilteredVideos(videos, filters))}/>
            <VideoGrid videos={videos}/>
        </FilterContext.Provider>
        </Flex>
    </Center>
    )
}

export default Home