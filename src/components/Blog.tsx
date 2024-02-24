import {Card, Col, Flex, Image, Row} from "antd"
import {ShareAltOutlined} from "@ant-design/icons"
import logo from "../../public/logoblue.svg"


export default function Blog() {
    return (
        <div style={{paddingLeft: '10rem', paddingRight: '10rem', marginBottom: '5rem', marginLeft:'auto', marginRight:'auto', maxWidth:'100rem'}}>
            <h2>Baǵdarlama haqqında</h2>
            <Card style={{boxShadow:'0 1px 1px 1px rgba(0, 0, 0, 0.2)'}}>
                <Row>
                    <Col span={20}>
                        <Flex gap='10rem'>
                            <h2 style={{margin: '0'}}>Túsindirme sózlik</h2>
                            <ShareAltOutlined style={{fontSize:'1.2rem', color:'#229ED9'}} />
                        </Flex>
                        <p style={{margin:'0', color:'gray'}}>Web sayt</p>
                        <p>
                            Bul platforma – 1982-1992-jılları kitap bolıp basılıp shıqqan “Qaraqalpaq tiliniń
                            túsindirme sózligi”niń 4 tomlıǵı tiykarında islep shıǵılǵan. Bul baǵdarlamaǵa 4 tomlıqtaǵı
                            sózler ózgerssiz kirgizilgen. Sonlıqtan, bunda sol dáwirge tiyisli bolǵan kóplegen sózler
                            de ushırasıwı múmkin. Biraq, ótken dáwirge tiyisli ayırırm ideologiyalıq baǵdardaǵı
                            sózlerdiń mánisin biliw de áhmiyetli. Házirgi waqıtta qaraqalpaq tilshileri tárepinen
                            Túsindirme sózliktiń 6 tomlıǵı tayarlanbaqta. Usı jańa zamanǵa say sózler menen
                            tolıqtırılǵan usı kóp tomlıqtaǵı sózler bizlerdiń platformamızǵa kiritilip barıladı.
                            Álbette, bul platformada ayırım kemshilikler bolıwı múmkin.   aldaǵı waqıtlarda dúzetip baramız.
                        </p>
                        <p>
                            <a style={{color:'#229ED9', textDecoration:'underline'}}>Tusindirmesozlik.uz</a> – sanlı
                            baǵdarlama bolıp, bunda qaraqalpaq tiliniń altın ǵáziynesinen
                            orın alǵan kóp mıńlaǵan sózlerdiń sinonimleri, mánisi, etimologiyası mısallar járdeminde
                            beriledi. Siz bul platformada qálegen waqıtta hám qálegen orında paydalanıw imkaniyatına
                            iye bolasız. Bizlerdiń tiykarǵı maqsetimiz – qaraqalpaq tilin internet global tarmaǵına
                            qosıw arqalı rawajlandırıw. Jaqın keleshekte platformanı taǵı da jetilistirip, oǵan
                            audiovariantlardı da qosıwdı rejelestirgenmiz. Eger de Ana tilimizdiń rawajlanıwına
                            úles qosqıńız kelse, biziń platformamızdı qollap-quwatlawıńızdı soraymız! Platforma
                            "Bookie" qaraqalpaq tilindegi audiokitaplar hám "KARSOFT-IT-SOLUTIONS" JSHJ tárepinen
                            islep shıǵıldı. Bul joybar Qaraqalpaqstan Respublikası Ministrler Keńesi janındaǵı
                            Qaraqalpaq tilin rawajlandırıw fondı tárepinen qollap-quwatlandı.
                        </p>
                    </Col>
                    <Col span={4}>
                        <Image src={logo}/>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

