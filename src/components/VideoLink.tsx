import {Button, Card, Col, Image, Row} from "antd"
import {ArrowRightOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'

export default function VideoLink() {
    return (
        <div style={{paddingLeft: '10rem', paddingRight: '10rem', marginBottom: '5rem', marginLeft:'auto', marginRight:'auto', maxWidth:'100rem'}}>
            <h2>Sózlerdi úyreniwdiń eń nátiyjeli usılı</h2>
            <Row gutter={20}>
                <Col span={16}>
                    <Link to='https://www.youtube.com/watch?v=UT9ndxZPXxY'>
                        <Image preview={false} src='../../public/Video.png' alt='videolink' />
                    </Link>
                </Col>
                <Col span={8}>
                    <Card style={{borderTop: '4px solid #229ED9'}}>
                        <h3>Eń nátıyjelı usılı</h3>
                        <p>
                            Sózlerdi úyreniwdiń eń nátiyjeli usılı - tek ǵana biz benen!
                            <a style={{color: '#229ED9'}}> Tusindirmesozlik.uz</a> - Qaraqalpaq tilindegi sózlerdi durıs
                            jazıw hám onıń mánisin mısallar járdeminde sizge shaǵıp beriwge járdem beredi! Video arqalı
                            veb sayttıń islew funkciyası hám kreativligin tolıǵıraq túsinip alasız.
                        </p>
                        <Row justify='end'>
                            <Button type='link'>Toliq <ArrowRightOutlined /></Button>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


