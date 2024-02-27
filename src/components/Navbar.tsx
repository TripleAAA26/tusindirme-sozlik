import { Button, Drawer, Flex } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../public/logo.svg'
import { MenuOutlined } from '@ant-design/icons'

export default function Navbar() {
    const [ currentLanguage, setCurrentLanguage ] = useState('QQ')
    const [ open, setOpen ] = useState(false)

    function changeLanguage() {
        setCurrentLanguage(prevState => prevState === 'QQ' ? 'КK' : 'QQ')
    }

    return (
        <>
            <div style={{
                backgroundColor: '#229ED9',
                color: 'white',
                height: '3rem',
                marginBottom: '5rem',
                padding: '1rem'
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
                />
            </span>
            <Drawer
                closable={true}
                placement="left"
                open={open}
                onClose={() => setOpen(false)}
                bodyStyle={{ backgroundColor: '#229ED9', }}
            >
                <NavItem
                    isInline={true}
                    currentLanguage={currentLanguage}
                    changeLanguage={changeLanguage}
                    setOpen={setOpen}
                />
            </Drawer>
        </>
    )
}

function NavItem({currentLanguage , changeLanguage, setOpen, isInline = false }) {

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
                    marginBottom: '5rem'
                } : {
                    fontSize: '1rem',
                    fontWeight: 'bold'
                }
            }
        >

            <Link to="/" onClick={() => setOpen(false)}>
                <Flex gap="1rem">
                    <img src={logo} alt="logo"/>
                    <span style={{ color: 'white' }}>Túsindirme sózlik</span>
                </Flex>
            </Link>
            <Flex vertical={isInline} gap="large">
                <Link to="#"
                      onClick={() => setOpen(false)}
                      style={{ color: 'white' }}
                >Sózler
                </Link>

                <Link to="/wordlist"
                      onClick={() => setOpen(false)}
                      style={{ color: 'white' }}
                >
                    Sózler dizimi
                </Link>

                <Link to="#"
                      onClick={() => setOpen(false)}
                      style={{ color: 'white' }}
                >
                    Baģdarlama haqqında
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