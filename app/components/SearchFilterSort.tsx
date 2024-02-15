import { Chip, Group, Stack, TextInput, Radio, Select, Title, Text, Collapse, Badge } from '@mantine/core'
import { IconSearch, IconCaretUpFilled, IconCaretDownFilled } from '@tabler/icons-react'
import { useContext, useState } from 'react'
import { FilterContext } from './Home'
import { RecentFilter, RuntimeFilter, SortAttribute, SortOrder } from '../types';
import { useDisclosure } from '@mantine/hooks';
import { primaryColor } from '../colors';

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

    const [numFilters, setNumFilters] = useState(0)

    const handleSearchTextChange = (query: string) => {
        setFilters({...filters, search: query})
    }

    const handleRuntimeChange = (value: RuntimeFilter) => {
        setRuntimeValue(value)
        setFilters({...filters, runtime: value})
        if (value !== RuntimeFilter.Any && runtimeValue === RuntimeFilter.Any) {
            setNumFilters(numFilters + 1)
        }
        if (value === RuntimeFilter.Any && runtimeValue !== RuntimeFilter.Any) {
            setNumFilters(numFilters - 1)
        }
    }

    const handleRecentChange = (value: RecentFilter) => {
        setRecentValue(value)
        setFilters({...filters, recent: value})
        if (value !== RecentFilter.Any && recentValue === RecentFilter.Any) {
            setNumFilters(numFilters + 1)
        }
        if (value === RecentFilter.Any && recentValue !== RecentFilter.Any) {
            setNumFilters(numFilters - 1)
        }
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

    const genresList = selectedGenres.concat(allGenres.filter(genre => !selectedGenres.includes(genre)));


  return (
    <Stack align='center' w='100%'>
        <TextInput size='md' radius='md' w={{base: '100%', sm: '80%', md: '60%'}}
            leftSection={icon}
            placeholder="Search video title, creator, etc."
            onChange={(event) => handleSearchTextChange(event.currentTarget.value)}
        />
        <Stack align='center' gap='lg'>
            <Group justify='center'>
            <Chip.Group multiple value={selectedGenres} onChange={handleSelectedGenre}>
                {genresList.slice(0, expanded ? allGenres.length : 8).map((genre) => 
                    <Chip color={primaryColor} key={genre} value={genre}>
                        {genre}
                    </Chip>)}
            </Chip.Group>
            {allGenres.length > collapsedGenreCount && <Chip variant='outline' checked={false} onClick={expanded ? expandedHandlers.close : expandedHandlers.open}>
                <Text size='23px'>{expanded ? "-" : "+"}</Text>
            </Chip>}
            </Group>

            <Group onClick={toggleFilter} style={{cursor: 'pointer', userSelect: 'none'}}>
                <Title fw={500} order={3}>FILTER</Title>
                {numFilters > 0 && <Badge size='lg' color={primaryColor}>{numFilters}</Badge>}
                {filterOpened ? <IconCaretUpFilled/> : <IconCaretDownFilled/>}
            </Group>
            <Collapse in={filterOpened} >
            <Group justify='center' gap='xl'>
                <Radio.Group
                    name="runtimeFilter"
                    label="RUNTIME"
                    value={runtimeValue}
                    onChange={handleRuntimeChange}>
                    <Stack className='mt-3'>
                        <Radio value={RuntimeFilter.Any} label={RuntimeFilter.Any} color={primaryColor}/>
                        <Radio value={RuntimeFilter.Short} label={RuntimeFilter.Short} color={primaryColor}/>
                        <Radio value={RuntimeFilter.Medium} label={RuntimeFilter.Medium} color={primaryColor}/>
                        <Radio value={RuntimeFilter.Long} label={RuntimeFilter.Long} color={primaryColor}/>
                    </Stack>
                </Radio.Group>

                <Radio.Group
                    name="recentFilter"
                    label="VIDEO RELEASE DATE"
                    value={recentValue}
                    onChange={handleRecentChange}>
                    <Stack className='mt-3'>
                        <Radio value={RecentFilter.Any} label={RecentFilter.Any} color={primaryColor}/>
                        <Radio value={RecentFilter.Short} label={RecentFilter.Short} color={primaryColor}/>
                        <Radio value={RecentFilter.Medium} label={RecentFilter.Medium} color={primaryColor}/>
                        <Radio value={RecentFilter.Long} label={RecentFilter.Long} color={primaryColor}/>
                    </Stack>
                </Radio.Group>
            </Group>
            </Collapse>

            <Group onClick={toggleSort} style={{cursor: 'pointer', userSelect: 'none'}}>
                <Title fw={500} order={3}>SORT</Title>
                {sortOpened ? <IconCaretUpFilled/> : <IconCaretDownFilled/>}
            </Group>
            <Collapse in={sortOpened}>
            <Group justify='center' align='center'>
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
                        <Radio value={SortOrder.Ascending} label={SortOrder.Ascending} color={primaryColor}/>
                        <Radio value={SortOrder.Descending} label={SortOrder.Descending} color={primaryColor}/>
                    </Stack>
                </Radio.Group>
            </Group>
            </Collapse>
        </Stack>
    </Stack>
  )
}

export default SearchFilterSort