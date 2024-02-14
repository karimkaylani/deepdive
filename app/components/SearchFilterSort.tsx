import { Chip, Group, Stack, TextInput, Radio, Select, Title, Button, Collapse } from '@mantine/core'
import { IconSearch, IconArrowDown, IconArrowUp } from '@tabler/icons-react'
import { useContext, useState } from 'react'
import { FilterContext } from './Home'
import { RecentFilter, RuntimeFilter, SortAttribute, SortOrder, secondaryColor } from '../globals';
import { useDisclosure } from '@mantine/hooks';

export interface SearchFilterSortProps {
    allGenres: string[];
}

const SearchFilterSort = ({allGenres}: SearchFilterSortProps) => {
    const icon = <IconSearch/>
    const collapsedGenreCount = 8
    const [runtimeValue, setRuntimeValue] = useState<RuntimeFilter>(RuntimeFilter.Any)
    const [recentValue, setRecentValue] = useState<RecentFilter>(RecentFilter.Any)

    const [sortValue, setSortValue] = useState<SortAttribute>(SortAttribute.DateRecommended)
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Descending)
    const {filters: {filters, setFilters}, sort: {sort, setSort}} = useContext(FilterContext);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [expanded, expandedHandlers] = useDisclosure(false);

    const [filterOpened, { toggle: toggleFilter }] = useDisclosure(false)
    const [sortOpened, { toggle: toggleSort }] = useDisclosure(false)

    const handleSearchTextChange = (query: string) => {
        setFilters({...filters, search: query})
    }

    const handleRuntimeChange = (value: RuntimeFilter) => {
        setRuntimeValue(value)
        setFilters({...filters, runtime: value})
    }

    const handleRecentChange = (value: RecentFilter) => {
        setRecentValue(value)
        setFilters({...filters, recent: value})
    }

    const handleSortAttributeChange = (value: SortAttribute) => {
        setSortValue(value)
        setSort({sort: value, order: sortOrder})
    }

    const handleSortOrderChange = (value: SortOrder) => {
        setSortOrder(value)
        setSort({sort: sortValue, order: value})
    }

    const handleSelectedGenre = (value: string[]) => {
        setSelectedGenres(value)
        setFilters({...filters, genres: value})
    }


  return (
    <Stack align='center' w='100%'>
        <TextInput size='md' radius='md' w='75%'
            leftSection={icon}
            placeholder="Search video title, creator, etc."
            onChange={(event) => handleSearchTextChange(event.currentTarget.value)}
        />
        <Stack align='center' gap='lg'>
            <Group>
            <Chip.Group multiple value={selectedGenres} onChange={handleSelectedGenre}>
                {allGenres.slice(0, expanded ? allGenres.length : 8).map((genre) => 
                    <Chip c={secondaryColor} key={genre} value={genre}>
                        {genre}
                    </Chip>)}
            </Chip.Group>
            {allGenres.length > collapsedGenreCount && <Chip variant='outline' checked={false} onClick={expanded ? expandedHandlers.close : expandedHandlers.open}>{expanded ? "Collapse" : "+"}</Chip>}
            </Group>

            <Group onClick={toggleFilter} style={{cursor: 'pointer', userSelect: 'none'}}>
                <Title fw={500} order={3}>FILTER</Title>
                {filterOpened ? <IconArrowUp/> : <IconArrowDown/>}
            </Group>
            <Collapse in={filterOpened} >
            <Group justify='center' gap='xl'>
                <Radio.Group
                    name="runtimeFilter"
                    label="RUNTIME"
                    value={runtimeValue}
                    onChange={handleRuntimeChange}>
                    <Stack className='mt-3'>
                        <Radio value={RuntimeFilter.Any} label={RuntimeFilter.Any}/>
                        <Radio value={RuntimeFilter.Short} label={RuntimeFilter.Short}/>
                        <Radio value={RuntimeFilter.Medium} label={RuntimeFilter.Medium}/>
                        <Radio value={RuntimeFilter.Long} label={RuntimeFilter.Long}/>
                    </Stack>
                </Radio.Group>

                <Radio.Group
                    name="recentFilter"
                    label="VIDEO RELEASE DATE"
                    value={recentValue}
                    onChange={handleRecentChange}>
                    <Stack className='mt-3'>
                        <Radio value={RecentFilter.Any} label={RecentFilter.Any}/>
                        <Radio value={RecentFilter.Short} label={RecentFilter.Short}/>
                        <Radio value={RecentFilter.Medium} label={RecentFilter.Medium}/>
                        <Radio value={RecentFilter.Long} label={RecentFilter.Long}/>
                    </Stack>
                </Radio.Group>
            </Group>
            </Collapse>

            <Group onClick={toggleSort} style={{cursor: 'pointer', userSelect: 'none'}}>
                <Title fw={500} order={3}>SORT</Title>
                {sortOpened ? <IconArrowUp/> : <IconArrowDown/>}
            </Group>
            <Collapse in={sortOpened}>
            <Group>
                <Select
                    placeholder="Sort by"
                    data={Object.values(SortAttribute)}
                    allowDeselect={false}
                    onChange={handleSortAttributeChange}
                    value={sortValue}
                />
                <Radio.Group
                    name="sortOrder"
                    value={sortOrder}
                    onChange={handleSortOrderChange}>
                    <Stack className='mt-3'>
                        <Radio value={SortOrder.Ascending} label={SortOrder.Ascending}/>
                        <Radio value={SortOrder.Descending} label={SortOrder.Descending}/>
                    </Stack>
                </Radio.Group>
            </Group>
            </Collapse>
        </Stack>
    </Stack>
  )
}

export default SearchFilterSort