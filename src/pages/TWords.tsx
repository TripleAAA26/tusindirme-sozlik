import { Card, Flex, Pagination } from "antd"

export default function TWords() {
    return (
        <div className='container'>
            <Card style={{ marginBottom: '5rem' }}>
                <p style={{ color: '#229ED9', fontSize: '2rem', fontWeight: 'bold' }}>
                    Tosınarlı sózler
                </p>
                <ul>
                    <li>
                        Paydasız
                    </li>
                </ul>
            </Card>
            <Flex justify="center">
                <Pagination total={130}/>
            </Flex>
        </div>
    )
}