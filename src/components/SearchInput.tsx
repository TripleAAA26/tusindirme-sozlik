import { useState } from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import usePublicGetWords from '../hooks/usePublicGetWords.ts'
import { useNavigate } from 'react-router-dom'

let timeout: ReturnType<typeof setTimeout> | null

const fetch = (value: string, callback: Function, wordList) => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }


    const fake = async () => {

        const { data } = wordList

        const filteredResults = data.filter(item =>
            item.title.latin.toLowerCase().includes(value.toLowerCase()) ||
            item.title.kiril.toLowerCase().includes(value.toLowerCase())
        )

        const result = filteredResults.map((item) => {
            return {
                value: item.title.latin,
                text: item.title.latin,
                id: item.id
            }
        })

        callback(result)

    }

    if (value) {
        timeout = setTimeout(fake, 300)
    } else {
        callback([])
    }
}

const SearchInput = (props) => {
    const [ data, setData ] = useState<SelectProps['options']>([])
    const [ value, setValue ] = useState<string>()
    const navigate = useNavigate()

    const { wordList } = usePublicGetWords()

    const handleSearch = (newValue: string) => {
        fetch(newValue, setData, wordList)
    }

    const handleChange = (newValue: string) => {
        setValue(newValue)
    }

    const handleSelect = (selected) => {
        const word = wordList.data.find(word => word.id === selected)
        navigate(`/soz/${word.id}`)
        setValue('')
        setData([])
    }

    return (
        <Select
            size="large"
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            onSelect={handleSelect}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.id,
                label: d.text,
                key: d.id
            }))}
        />
    )
}

export default SearchInput