import { ShareAltOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Row, Skeleton } from 'antd'
import { useLocation, useParams } from 'react-router-dom'
import usePublicGetWords from '../../hooks/usePublicGetWords.ts'
import useShare from '../../hooks/useShare.tsx'
import { useSelector } from 'react-redux'
import { selectIsLatin } from '../../features/public-client-side/languageSlice.ts'


export default function SearchResults() {
    const { idsoz } = useParams()
    const { wordList, isLoadingWords } = usePublicGetWords()
    const location = useLocation()
    const { shareHandler } = useShare()
    const isLatin = useSelector(selectIsLatin)

    const word = wordList?.data?.find(item => Number(idsoz) === item.id)


    return (
        <div className='container'>
            <Card style={{ minHeight: '40rem'}}>
            {isLoadingWords ? <Skeleton /> :
                <div>
                <Flex justify="space-between">
                    <Flex gap="2rem">
                        <h1 style={{ margin: '0' }}>
                            {isLatin? word.title.latin : word.title.kiril}
                        </h1>
                    </Flex>
                    <ShareAltOutlined onClick={() => shareHandler(location.pathname)} style={{fontSize:'1.5rem', color:'#229ED9'}} />
                </Flex>
                <p style={{ color: 'lightgray', marginTop: '0' }}>
                    {isLatin ? word.category.latin : word.category.kiril}
                </p>
                <p>
                    {isLatin ? word.description.latin : word.description.kiril}
                </p>
                <Row>
                    <Col span={8}>
                        <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                            {isLatin ? 'Sinonim' : 'Синоним'}
                        </div>
                        {word.synonym && word.synonym?.map(item =>
                            <div key={item.id}>
                                {isLatin ? item.title.latin : item.title.kiril}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                            {isLatin ? 'Antonim' : 'Aнтоним'}
                        </div>
                        {word.antonym && word.antonym?.map(item =>
                            <div key={item.id}>
                                {isLatin ? item.title.latin : item.title.kiril}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                            {isLatin ? "Uqsas so'zler" : 'Уқсaс сөзлер'}
                        </div>
                    </Col>
                </Row>
                </div>
            }
            </Card>
        </div>
    )
}

