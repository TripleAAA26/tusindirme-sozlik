import { Card, Flex, Select } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom'
import SearchInput from './SearchInput.tsx'
import SearchResults from './SearchResults.tsx'
import { useState } from 'react'


export default function SearchBar() {
    const [ selectedWord, setSelectedWord ] = useState()



    return (
        <div className='container' >
            <h2>Bir sózdi izleń, onı úyreniń</h2>

            { selectedWord
                ?
                <SearchResults word={selectedWord} />
                :
                <Flex style={{ marginBottom: '4rem' }}>
                    <Select
                        options={[
                            { value: 'a', label: 'Aa —' }, { value: 'á', label: 'Áá —' }, { value: 'b', label: 'Bb —' },
                            { value: 'd', label: 'Dd —' }, { value: 'e', label: 'Ee —' }, { value: 'f', label: 'Ff —' },
                            { value: 'g', label: 'Gg —' }, { value: 'ǵ', label: 'Ǵǵ —' }, { value: 'h', label: 'Hh —' },
                            { value: 'x', label: 'Xx —' }, { value: 'í', label: 'Íí —' }, { value: 'i', label: 'Ii —' },
                            { value: 'j', label: 'Jj —' }, { value: 'k', label: 'Kk —' }, { value: 'q', label: 'Qq —' },
                            { value: 'l', label: 'Ll —' }, { value: 'm', label: 'Mm —' }, { value: 'n', label: 'Nn —' },
                            { value: 'ń', label: 'Ńń —' }, { value: 'o', label: 'Oo —' }, { value: 'ó', label: 'Óó —' },
                            { value: 'p', label: 'Pp —' }, { value: 'r', label: 'Rr —' }, { value: 's', label: 'Ss —' },
                            { value: 't', label: 'Tt —' }, { value: 'u', label: 'Uu —' }, { value: 'ú', label: 'Úú —' },
                            { value: 'v', label: 'Vv —' }, { value: 'w', label: 'Ww —' }, { value: 'y', label: 'Yy —' },
                            { value: 'z', label: 'Zz —' }, { value: 'sh', label: 'Shsh —' }, { value: 'c', label: 'Cc —' },
                            { value: 'ch', label: 'Chch —' }
                        ]}
                        style={{
                            width:'6rem',
                            borderRight: '1px solid lightgray',
                        }}
                        suffixIcon={null}
                        placeholder='Aa —'
                        size='large'
                    />
                    <SearchInput
                        setSelectedWord={setSelectedWord}
                        placeholder='Sózdi izlew ushın jazıń ...'
                        style={{width: '100%', }}
                    />
                </Flex>
            }

            <Flex className='three-cards' gap='large' justify='space-between'>
                <Card  className='card-bar'>
                    <h3 style={{ color: '#229ED9' }}>Kóp izlenetuģın sózler</h3>
                    <p>Xızmetker</p>
                    <p>Rezerv</p>
                    <p>Jaǵday</p>
                    <p>Qıyal</p>
                    <p>Dizim</p>
                    <p>Hújjet</p>
                    <Link to='oftenwords'>Hámmesin kóriw <ArrowRightOutlined/></Link>
                </Card>
                <Card className='card-bar'>
                    <h3 style={{ color: '#229ED9' }}>Tosınarlı sózler</h3>
                    <p>Paydasız</p>
                    <p>Tıshqan</p>
                    <p>Qimir</p>
                    <p>Haqparastlik</p>
                    <p>Barkash</p>
                    <p>Sayılvor</p>
                    <Link to='twords'>Hámmesin kóriw <ArrowRightOutlined/></Link>
                </Card>
                <Card className='card-bar'>
                    <h3 style={{ color: '#229ED9' }}>Kóp qáte etiletuǵın sózler</h3>
                    <p>Afv</p>
                    <p>Shıbın-shirkey</p>
                    <p>Kesellikti anıqlaw</p>
                    <p>Qáte</p>
                    <p>Shıǵın</p>
                    <p>Vaalaykum assalam</p>
                    <Link to='misspelledwords'>Hámmesin kóriw <ArrowRightOutlined/></Link>
                </Card>
            </Flex>
        </div>
    )
}

