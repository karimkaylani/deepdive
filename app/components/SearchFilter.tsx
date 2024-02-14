import { Chip, Group, Stack, TextInput, Text, Radio } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useContext, useState } from 'react'
import { FilterContext } from './Home'
import { RuntimeFilter, secondaryColor } from '../globals';

export interface SearchFilterProps {
    allGenres: string[];
}

const SearchFilter = ({allGenres}: SearchFilterProps) => {
    const icon = <IconSearch/>
    const [runtimeValue, setRuntimeValue] = useState<RuntimeFilter>(RuntimeFilter.All)
    const {filters, setFilters} = useContext(FilterContext);

    const handleSearchTextChange = (query: string) => {
        setFilters({...filters, search: query})
    }

    const handleRuntimeChange = (value: RuntimeFilter) => {
        setRuntimeValue(value)
        setFilters({...filters, runtime: value})
    }
  return (
    <Stack align='center' w='100%'>
        <TextInput size='lg' radius='md' w='75%'
            leftSection={icon}
            placeholder="Search videos"
            onChange={(event) => handleSearchTextChange(event.currentTarget.value)}
        />
        <Stack align='center'>
            <Group>
                {allGenres.map((genre) => 
                    <Chip c={secondaryColor} key={genre} onChange={() => 
                        setFilters({...filters, 
                            genres: filters.genres.includes(genre) ? filters.genres.filter((g) => g !== genre) : [...filters.genres, genre]})}>
                        {genre}
                    </Chip>)}
            </Group>
            <Group justify='space-between'>
                <Radio.Group
                    name="runtimeFilter"
                    label="Runtime"
                    value={runtimeValue}
                    onChange={handleRuntimeChange}>
                    <Stack className='mt-3'>
                        <Radio value={RuntimeFilter.All} label="Any"/>
                        <Radio value={RuntimeFilter.Short} label="Short (< 15 minutes)"/>
                        <Radio value={RuntimeFilter.Medium} label="Medium (15 - 45 minutes)"/>
                        <Radio value={RuntimeFilter.Long} label="Long (> 45 minutes)"/>
                    </Stack>
                </Radio.Group>


            </Group>
        </Stack>
    </Stack>
  )
}

export default SearchFilter