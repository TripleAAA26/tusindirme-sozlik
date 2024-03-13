import { Button, Drawer, Flex } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../public/logo.svg'
import { MenuOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage, switchLanguage } from '../features/public-client-side/languageSlice.ts'

export default function Navbar() {
    const [ open, setOpen ] = useState(false)
    const dispatch = useDispatch()
    const currentLanguage = useSelector(selectCurrentLanguage)

    function changeLanguage() {
        dispatch(switchLanguage())
    }

    return (
        <div style={{ position: 'sticky', top: '0', zIndex: 1 }}>
            <div style={{
                backgroundColor: '#229ED9',
                color: 'white',
                height: '3rem',
                marginBottom: '5rem',
                padding: '1rem',
                }}
                 className='menuIcon'
            >
                <MenuOutlined
                    style={{ fontSize: '3rem' }}
                    onClick={() => setOpen(true)}
                />
            </div>
            <span className='menuHeader'>
                <NavItem
                    currentLanguage={currentLanguage}
                    changeLanguage={changeLanguage}
                    isInline={false}
                />
            </span>
            <Drawer
                closable={true}
                placement="left"
                open={open}
                onClose={() => setOpen(false)}
                styles={{ body: { backgroundColor: '#229ED9' } }}
            >
                <NavItem
                    isInline={true}
                    currentLanguage={currentLanguage}
                    changeLanguage={changeLanguage}
                    setOpen={setOpen}
                />
            </Drawer>
        </div>
    )
}

function NavItem({currentLanguage , changeLanguage, setOpen, isInline }) {
    const isLatin = currentLanguage === 'Qq'

    function CloseHandler() {
        document.getElementById('searchBar').scrollIntoView({behavior: 'smooth'})
        if(!setOpen) return
        setOpen(false)
    }

    return (
        <Flex
            vertical={isInline}
            align="center"
            justify="space-between"
            gap="1rem"
            style={
                !isInline ? {
                    backgroundColor: '#229ED9',
                    paddingLeft: '10rem',
                    paddingRight: '10rem',
                    color: 'white',
                    height: '5rem',
                    marginBottom: '5rem',
                } : {
                    fontSize: '1rem',
                    fontWeight: 'bold'
                }
            }
        >

            <Link to="/" onClick={CloseHandler}>
                <Flex gap="1rem">
                    <img src={logo} alt="logo"/>
                    <p style={{ fontWeight: 'bold', color: 'white' }}>
                        {isLatin ? 'Túsindirme sózlik' : 'Тусиндирме сөзлик'}
                    </p>
                </Flex>
            </Link>
            <Flex vertical={isInline} gap="large">
                <Link to="/"
                      onClick={CloseHandler}
                      style={{ color: 'white' }}
                >
                    {isLatin ? 'Sózler' : 'Сөзлер'}
                </Link>

                <Link to="/wordlist"
                      onClick={CloseHandler}
                      style={{ color: 'white' }}
                >
                    {isLatin ? 'Sózler dizimi' : 'Сөзлер дизими'}
                </Link>

                <Link to="/about"
                      onClick={CloseHandler}
                      style={{ color: 'white' }}
                >
                    {isLatin ? 'Baģdarlama haqqında' : 'Бағдарлама ҳаққында'}
                </Link>
            </Flex>

            <Button
                type="text"
                style={{ color: 'white', border: '1px solid white', width: '3.2rem' }}
                onClick={changeLanguage}
            >
                {currentLanguage}
            </Button>
        </Flex>
    )
}