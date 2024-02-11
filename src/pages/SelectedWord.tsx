import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Col, Row } from 'antd'
import { getWordsApi } from '../service/wordApi.ts'
import useAuth from '../hooks/useAuth.tsx'
import CardAntonymSynonym from '../components/CardAntonymSynonym.tsx'


export default function SelectedWord() {
    const { idword } = useParams()
    const { auth: accessToken } = useAuth()

    const { data:words } = useQuery({
        queryKey: [ 'words' ],
        queryFn: async () => getWordsApi({ accessToken })
    })
    const selectedWord = words?.data.find( word => word.id === Number(idword) )


    return (
        <>
            <Row style={{ display: 'block' }}>
                <h1>{selectedWord.title.latin}</h1>
                <h2>{selectedWord.title.kiril}</h2>
            </Row>
            <Row style={{ justifyContent: 'space-between'}}>
                <Col>
                    <p>Description:</p>
                    <p>{selectedWord.description.latin}</p>
                    <p>{selectedWord.description.kiril}</p>
                    <p>Category:</p>
                    <p>{selectedWord.category.latin},</p>
                    <p>{selectedWord.category.kiril}</p>
                </Col>
                <Col>
                    <CardAntonymSynonym selectedWord={selectedWord} words={words} isAntonym={true} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardAntonymSynonym selectedWord={selectedWord} words={words} isAntonym={false} />
                </Col>
            </Row>
        </>
    )
}
