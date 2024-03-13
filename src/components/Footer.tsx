import {Flex} from "antd"
import play from '../../public/googleplay.svg'
import { Link } from 'react-router-dom'
import logo from "../../public/logoblue.svg"
import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectIsLatin } from '../features/public-client-side/languageSlice.ts'

export default function Footer() {
    const isLatin = useSelector(selectIsLatin)

    return (
        <div className='container'>
            <Flex
                style={{borderTop: '1px solid lightgrey'}}
                justify='space-between'
                align='center'
                className='footer-icons'
            >
                <Flex gap='0.5rem' style={{color:'#229ED9'}} align='center'>
                    <img style={{height:'1.5rem', width:'1.5rem'}} src={logo} alt="logo"/>
                    <p style={{fontWeight: 'bold'}}>
                        {isLatin ? 'Túsindirme sózlik' : 'Тусиндирме сөзлик'}
                    </p>
                </Flex>

                <Link target='_blank' to='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik'>
                    <img src={play} alt="playmarket"/>
                </Link>

                <Flex gap='2rem'>
                    <Link style={{ color: 'gray' }} target="_blank" to='https://www.youtube.com/channel/UCrb_94b-JGhG0X43CUx6CyA'>
                        <FaYoutube />
                    </Link>
                    <Link style={{ color: 'gray' }} target="_blank" to='https://www.instagram.com/tusindirme_sozlik'>
                        <FaInstagram />
                    </Link>
                    <Link style={{ color: 'gray' }} target="_blank" to='https://t.me/tusindirmesoz'>
                        <FaTelegram />
                    </Link>
                </Flex>
            </Flex>

            <p style={{color:'gray', textAlign: 'center'}}>
                Avtorlıq huqıqı © {new Date().getFullYear()} Bookie audiokitaplar, "KARSOFT-IT-SOLUTIONS" JSHJ • Barlıq huqıqlar qorǵalǵan.
            </p>
        </div>
    )
}

