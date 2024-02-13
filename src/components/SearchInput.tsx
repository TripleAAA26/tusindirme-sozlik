import React, { useState } from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'
import { getWords } from '../service/getWords.ts'

let timeout: ReturnType<typeof setTimeout> | null
let currentValue: string

const fetch = (value: string, callback: Function) => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    currentValue = value

    const fake = async () => {

         const d = await getWords()

         if (currentValue === value) {
             const { data } = d
             const result = data.map((item: any) => ({
                 value: item.title.latin,
                 text: item.title.latin,
                 id: item.id
             }))

             callback(result)
         }
    }

    if (value) {
        timeout = setTimeout(fake, 300)
    } else {
        callback([])
    }
}

const SearchInput: React.FC<{ placeholder: string; style: React.CSSProperties; setSelectedWord: React.Dispatch<React.SetStateAction<string>> }> = (props) => {
    const [ data, setData ] = useState<SelectProps['options']>([])
    const [ value, setValue ] = useState<string>()

    const handleSearch = (newValue: string) => {
        fetch(newValue, setData)
    }

    const handleChange = (newValue: string) => {
        setValue(newValue)
    }

    const handleSelect = (selected) => {
        props.setSelectedWord(selected)
    }

    return (
        <Select
            size='large'

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