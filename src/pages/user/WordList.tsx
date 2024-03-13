import { Link, useParams } from 'react-router-dom'
import { Empty, Flex, Pagination, Skeleton } from 'antd'
import usePublicGetWords from '../../hooks/usePublicGetWords.ts'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLatin } from '../../features/public-client-side/languageSlice.ts'



export default function WordList() {
    const [ currentPage, setCurrentPage ] = useState(1)
    const { letter } = useParams()
    const { wordList, isLoadingWords } = usePublicGetWords()
    const isLatin = useSelector(selectIsLatin)

    const wordsByAlphabet = letter ?
        wordList?.data?.filter((item) => item.title.latin.startsWith(letter) || item.title.kiril.startsWith(letter))
        :
        wordList?.data

    const indexOfLastWord = currentPage * 5
    const indexOfFirstWord = indexOfLastWord - 5
    const currentPageWords = wordsByAlphabet?.slice(indexOfFirstWord, indexOfLastWord)

    function handleWord() {
        document.getElementById('searchBar').scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div className='container'>
            <h2>{isLatin ? 'Sózler dizimi' : 'Сөзлер дизими'}</h2>

            <div className='wordlist-container'>
                {isLoadingWords ?
                    <Skeleton title={false} paragraph={{rows: 15 }}  />
                :
                    wordsByAlphabet.length  ?
                    <div>
                        <ul className='sozler-dizimi'>
                            {currentPageWords.map(item =>
                                <li
                                    key={item.id}
                                    className='soz'
                                >
                                    <Link onClick={handleWord} to={`/soz/${item.id}`} style={{ textDecoration: 'none', color:'inherit' }}>
                                        {isLatin ? item.title.latin : item.title.kiril}
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <Flex justify="center">
                            <Pagination
                                hideOnSinglePage
                                pageSize={5}
                                total={wordsByAlphabet?.length}
                                showSizeChanger={false}
                                current={currentPage}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </Flex>
                    </div>
                    : <Empty />
                }
            </div>
        </div>
    )
}
