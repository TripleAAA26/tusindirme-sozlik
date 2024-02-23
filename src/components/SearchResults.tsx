import { AudioOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Row } from 'antd'


export default function SearchResults({ word }) {
    console.log('result',word)


    return (
        <Card>
            <Flex justify='space-between'>
                <Flex gap='2rem'>
                    <h1 style={{ margin: '0' }}>{word.title.latin}</h1>
                    <AudioOutlined style={{ fontSize: '1.5rem' }}/>
                </Flex>
                <ShareAltOutlined style={{ fontSize: '1.5rem' }}/>
            </Flex>
            <p style={{ color: 'lightgray', marginTop: '0' }}>{word.category.latin}</p>
            <p>
                {word.description.latin}
            </p>
            <Row>
                <Col span={8}>
                    <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                        Sinonim
                    </div>
                    {word.synonym && word.synonym?.map(item =>
                        <div key={item.id}>
                            {item.title.latin}
                        </div>
                    )}
                </Col>
                <Col span={8}>
                    <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                        Antonim
                    </div>
                    {word.antonym && word.antonym?.map(item =>
                        <div key={item.id}>
                            {item.title.latin}
                        </div>
                    )}
                </Col>
                <Col span={8}>
                    <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                        Uqsas so'zler
                    </div>

                </Col>
            </Row>
        </Card>
    )
}

