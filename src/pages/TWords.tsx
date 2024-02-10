import { Card, Flex, Pagination } from "antd"

export default function TWords() {
    return (
        <div style={{
            paddingLeft: '10rem',
            paddingRight: '10rem',
            marginBottom: '5rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100rem'
        }}>
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