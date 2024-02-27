import { Card, Flex, Pagination } from "antd"

export default function OftenSearchedWords() {
    return (
        <div className='container'>
            <Card style={{ marginBottom: '5rem' }}>
                <p style={{ color: '#229ED9', fontSize: '2rem', fontWeight: 'bold' }}>
                    Kóp qıdırılǵan sózler
                </p>
                <ul>
                    <li>
                        Xizmetkerler
                    </li>
                </ul>
            </Card>
            <Flex justify="center">
                <Pagination total={130}/>
            </Flex>
        </div>
    )
}