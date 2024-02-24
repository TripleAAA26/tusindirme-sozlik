import {Flex} from "antd"
import play from '../../public/googleplay.svg'
import {FacebookOutlined, InstagramOutlined, WhatsAppOutlined, YoutubeOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom'
import logo from "../../public/logoblue.svg"

export default function Footer() {
    return (
        <div style={{paddingLeft: '10rem', paddingRight: '10rem', marginBottom: '5rem', marginLeft:'auto', marginRight:'auto', maxWidth:'100rem'}}>
            <Flex style={{borderTop: '1px solid lightgrey'}} justify='space-between' align='center'>
                <Flex gap='0.5rem' style={{color:'#229ED9'}} align='center'>
                    <img style={{height:'1.5rem', width:'1.5rem'}} src={logo} alt="logo"/>
                    <p style={{fontWeight: 'bold'}}>Túsindirme sózlik</p>
                </Flex>

                <Link to='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik&hl=en&gl=US&pli=1'>
                    <img src={play} alt="playmarket"/>
                </Link>

                <Flex style={{color: 'gray'}} gap='2rem'>
                    <FacebookOutlined />
                    <InstagramOutlined />
                    <YoutubeOutlined />
                    <WhatsAppOutlined />
                </Flex>
            </Flex>

            <p style={{color:'gray', textAlign: 'center'}}>
                Avtorlıq huqıqı © {new Date().getFullYear()} Bookie audiokitaplar, "KARSOFT-IT-SOLUTIONS" JSHJ • Barlıq huqıqlar qorǵalǵan.
            </p>
        </div>
    )
}

