import { Flex } from 'antd'
import SearchInput from './SearchInput.tsx'
import { useSelector } from 'react-redux'
import { selectIsLatin } from '../features/public-client-side/languageSlice.ts'


export default function SearchBar() {
    const isLatin = useSelector(selectIsLatin)

    return (
        <div className="container" id='searchBar'>
            <h2>
                {isLatin ? 'Bir sózdi izleń, onı úyreniń' : 'Бир сөзди излең, оны үйрениң'}
            </h2>

            <Flex style={{ marginBottom: '10rem' }}>
                <SearchInput
                    placeholder={isLatin ? 'sózdi izlew ushın jazıń...' : 'сөзди излеў ушын жазың...'}
                    style={{ width: '100%', }}
                />
            </Flex>
        </div>
    )
}

