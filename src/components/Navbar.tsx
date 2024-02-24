import { Button, Flex } from "antd"
import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../../public/logo.svg"

export default function Navbar() {
    const [ currentLanguage, setCurrentLanguage ] = useState('QQ')

    function changeLanguage() {
        setCurrentLanguage(prevState => prevState === 'QQ' ? 'КК' : 'QQ')
    }

    return (
        <Flex align='center' justify='space-between' style={{
            backgroundColor: '#229ED9',
            paddingLeft: '10rem',
            paddingRight: '10rem',
            color: 'white',
            height: '5rem',
            marginBottom: '5rem'
        }}>

            <Link to='/'>
                <Flex gap='1rem'>
                    <img src={logo} alt="logo"/>
                    <span style={{ color: 'white' }}>Túsindirme sózlik</span>
                </Flex>
            </Link>
            <Flex gap='large'>
                <Link to='#' style={{ color: 'white' }}>Sózler</Link>
                <Link to='/wordlist' style={{ color: 'white' }}>Sózler dizimi</Link>
                <Link to='#' style={{ color: 'white' }}>Baģdarlama haqqında</Link>
            </Flex>

            <Button
                type='text'
                style={{ color: 'white', border: '1px solid white' }}
                onClick={changeLanguage}
            >
                {currentLanguage}
            </Button>
        </Flex>
    )
}

