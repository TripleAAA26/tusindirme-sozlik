import { Card, Flex, Pagination } from "antd"

export default function MisspelledWords() {
    return (
        <div className='container'>
            <Card style={{ marginBottom: '5rem' }}>
                <p style={{ color: '#229ED9', fontSize: '2rem', fontWeight: 'bold' }}>
                    Kóp qáte etiletuǵın sózler
                </p>
                <ul>
                    <li>
                        Afv
                    </li>
                </ul>
            </Card>
            <Flex justify="center">
                <Pagination total={130}/>
            </Flex>
        </div>
    )
}