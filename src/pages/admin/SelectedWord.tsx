import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Checkbox, Col, message, Row } from 'antd'
import { getWordsApi } from '../../service/wordApi.ts'

import CardAntonymSynonym from '../../features/Admin-Panel/Word/CardAntonymSynonym.tsx'
import CardAudio from '../../features/Admin-Panel/Audio/CardAudio.tsx'
import useIsCorrect from '../../features/Admin-Panel/Word/useIsCorrect.ts'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice.ts'


export default function SelectedWord() {
    const { idword } = useParams()
    const accessToken = useSelector(selectCurrentToken)


    const [ messageApi, contextHolder ] = message.useMessage()

    const { isCorrect, isPending:isChecking } = useIsCorrect()

    const { data:words } = useQuery({
        queryKey: [ 'words' ],
        queryFn: async () => getWordsApi({ accessToken })
    })
    const selectedWord = words?.data.find( word => word.id === Number(idword) )

    function checkboxHandler(e) {
        isCorrect({
            idWord: selectedWord.id,
            updatedIsCorrect: {
                is_correct: e.target.checked
            }
        }, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'Word successfully checked!',
                })
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Could not check word!',
                })
            }
        })
    }

    return (
        <>
            {contextHolder}
            <Row style={{ display: 'block' }}>
                <h1>{selectedWord.title.latin}</h1>
                <h2 style={{color: 'gray'}}>{selectedWord.title.kiril}</h2>
                <Checkbox onChange={checkboxHandler} checked={selectedWord.is_correct} disabled={isChecking}>
                    Is correct
                </Checkbox>
            </Row>
            <Row style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Col>
                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold'}}>Description:</p>
                    <p>{selectedWord.description.latin}</p>
                    <p>{selectedWord.description.kiril}</p>
                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold'}}>Category:</p>
                    <p>{selectedWord.category.latin},</p>
                    <p>{selectedWord.category.kiril}</p>
                </Col>
                <Col>
                    <CardAntonymSynonym selectedWord={selectedWord} words={words} isAntonym={true} />
                </Col>
            </Row>
            <Row style={{ justifyContent: 'space-between', gap: '1rem'}}>
                <Col>
                    <CardAudio selectedWord={selectedWord} />
                </Col>
                <Col>
                    <CardAntonymSynonym selectedWord={selectedWord} words={words} isAntonym={false} />
                </Col>
            </Row>
        </>
    )
}
