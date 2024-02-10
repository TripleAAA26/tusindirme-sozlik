import { AudioOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Row } from 'antd'

export default function SearchResults({ selectedWord }) {
    console.log('result',selectedWord)

    return (
        <Card>
            <Flex justify='space-between'>
                <Flex gap='2rem'>
                    <h1 style={{ margin: '0' }}>{selectedWord}</h1>
                    <AudioOutlined style={{ fontSize: '1.5rem' }}/>
                </Flex>
                <ShareAltOutlined style={{ fontSize: '1.5rem' }}/>
            </Flex>
            <p style={{ color: 'lightgray', marginTop: '0' }}>Kelbetlik</p>
            <p>
                Jetkilikli, mol, kóp, qurǵın, barshılıq. Zamanımız endi boldı abadan. Kámbaǵalǵa náwbet jete
                basladı (A. Muwsaev). Biz paxtakesh xalıqlar azat shıǵısta, Jasaymız abadan shadlı turmısta
                (I. Yusupov). Ádira qalǵır tuwǵan jer. Bolmaǵan soń abadan (Jiyen jıraw).
            </p>
            <Row>
                <Col span={8}>
                    <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                        Sinonim
                    </div>
                    <div>Abadan</div>
                    <div>Abadanshılıq</div>
                    <div>Abay</div>
                </Col>
                <Col span={8}>
                    <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                        Antonim
                    </div>
                    <div>Abay-sıyasat</div>
                    <div>Abaylı</div>
                    <div>Abaysız</div>
                </Col>
                <Col span={8}>
                    <div style={{ color: '#229ED9', fontWeight: 'bold' }}>
                        Uqsas so'zler
                    </div>
                    <div>Abadan</div>
                    <div>Abadanlıq</div>
                    <div>Abaysızlıq</div>
                </Col>
            </Row>
        </Card>
    )
}

