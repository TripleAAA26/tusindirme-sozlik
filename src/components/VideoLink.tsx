import { Card, Col, Flex, Image, Row, Skeleton } from 'antd'
import { ArrowRightOutlined, AudioOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import youtubeLink from '../../public/Video.png'
import useGetWordOfDay from '../hooks/useGetWordOfDay.ts'
import useShare from '../hooks/useShare.tsx'
import { useSelector } from 'react-redux'
import { selectIsLatin } from '../features/public-client-side/languageSlice.ts'

export default function VideoLink() {
    const { wordOfDay, isLoadingWordOfDay } = useGetWordOfDay()
    const { shareHandler } = useShare()
    const isLatin = useSelector(selectIsLatin)

    return (
        <div className='container' >
            <div style={{ minHeight: '44rem' }}>
                <Card
                    title={
                    <div style={{ color: '#229ED9', fontSize: '1rem', fontWeight: 'bold'}}>
                        {isLatin ? 'KÚN SÓZI' : 'КҮН СӨЗИ'}
                    </div>
                    }
                    style={{ boxShadow: '0 2px 10px 2px rgba(0,0,0, 0.1)' }}
                >
                    {isLoadingWordOfDay ?
                        <Skeleton title={false} />
                        :
                        <div>
                            <Flex justify="space-between">
                                <Flex gap="2rem">
                                    <h1 style={{ margin: '0' }}>
                                        {isLatin ? wordOfDay?.title.latin : wordOfDay?.title.kiril}
                                    </h1>
                                </Flex>
                                <ShareAltOutlined
                                    onClick={() => shareHandler(`/soz/${wordOfDay.id}`)}
                                    style={{fontSize:'1.5rem', color:'#229ED9'}}
                                />
                            </Flex>
                            <p style={{ color: 'lightgray', marginTop: '0' }}>
                                {isLatin ? wordOfDay?.category.latin : wordOfDay?.category.kiril}
                            </p>
                            <p>
                                {isLatin ? wordOfDay?.description.latin : wordOfDay?.description.kiril}
                            </p>
                        </div>
                    }
                </Card>

                <h2>{isLatin ? 'Sózlerdi úyreniwdiń eń nátiyjeli usılı' : 'Сөзлерди үйрениўдиң ең нәтийжели усылы'}</h2>

                <Row gutter={20} className='video-link'>
                    <Col span={16}>
                        <Link target='_blank' to='https://www.youtube.com/watch?v=UT9ndxZPXxY'>
                            <Image preview={false} src={youtubeLink} alt='videolink' />
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Card style={{borderTop: '4px solid #229ED9'}}>
                            <h3>{isLatin ? 'Eń nátıyjelı usılı' : 'Eң нәтийжели усылы'}</h3>
                            <p>
                                {isLatin
                                    ?
                                    `Sózlerdi úyreniwdiń eń nátiyjeli usılı - tek ǵana biz benen!
                                    Tusindirmesozlik.uz - Qaraqalpaq tilindegi sózlerdi durıs
                                    jazıw hám onıń mánisin mısallar járdeminde sizge shaǵıp beriwge járdem beredi! Video arqalı
                                    veb sayttıń islew funkciyası hám kreativligin tolıǵıraq túsinip alasız.`
                                    :
                                    `Сөзлерди үйрениўдиң ең нәтийжели усылы - тек ғана биз бенен! Тусиндирмесозлик.уз
                                     - Қарақалпақ тилиндеги сөзлерди дурыс жазыў ҳәм оның мәнисин мысаллар жәрдеминде 
                                     сизге шағып бериўге жәрдем береди! Видео арқалы веб сайттың ислеў ўаункциясы 
                                     ҳәм креативлигин толығырақ түсинип аласыз.`
                                }
                            </p>
                            <Row justify='end'>
                                <Link target='_blank' to='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik'>
                                    {isLatin ? 'Toliq' : 'Толық'}
                                    <ArrowRightOutlined />
                                </Link>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


