import { Card, Skeleton } from 'antd'
import usePublicGetWords from '../hooks/usePublicGetWords.ts'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLatin } from '../features/public-client-side/languageSlice.ts'

const AlphabetLatin = [
    { value: 'a', label: 'Aa' }, { value: 'á', label: 'Áá' }, { value: 'b', label: 'Bb' },
    { value: 'd', label: 'Dd' }, { value: 'e', label: 'Ee' }, { value: 'f', label: 'Ff' },
    { value: 'g', label: 'Gg' }, { value: 'ǵ', label: 'Ǵǵ' }, { value: 'h', label: 'Hh' },
    { value: 'x', label: 'Xx' }, { value: 'í', label: 'Íí' }, { value: 'i', label: 'Ii' },
    { value: 'j', label: 'Jj' }, { value: 'k', label: 'Kk' }, { value: 'q', label: 'Qq' },
    { value: 'l', label: 'Ll' }, { value: 'm', label: 'Mm' }, { value: 'n', label: 'Nn' },
    { value: 'ń', label: 'Ńń' }, { value: 'o', label: 'Oo' }, { value: 'ó', label: 'Óó' },
    { value: 'p', label: 'Pp' }, { value: 'r', label: 'Rr' }, { value: 's', label: 'Ss' },
    { value: 't', label: 'Tt' }, { value: 'u', label: 'Uu' }, { value: 'ú', label: 'Úú' },
    { value: 'v', label: 'Vv' }, { value: 'w', label: 'Ww' }, { value: 'y', label: 'Yy' },
    { value: 'z', label: 'Zz' }, { value: 'sh', label: 'Shsh' }, { value: 'c', label: 'Cc' },
    { value: 'ch', label: 'Chch' }
]


const AlphabetKiril = [
    { value: 'a', label: 'Aa' }, { value: 'ә', label: 'Әә' }, { value: 'б', label: 'Бб' },
    { value: 'в', label: 'Вв' }, { value: 'г', label: 'Гг' }, { value: 'ғ', label: 'Ғғ' },
    { value: 'д', label: 'Дд' }, { value: 'e', label: 'Ee' }, { value: 'ё', label: 'Ёё' },
    { value: 'ж', label: 'Жж' }, { value: 'з', label: 'Зз' }, { value: 'и', label: 'Ии' },
    { value: 'й', label: 'Йй' }, { value: 'к', label: 'Кк' }, { value: 'қ', label: 'Ққ' },
    { value: 'л', label: 'Лл' }, { value: 'м', label: 'Мм' }, { value: 'н', label: 'Нн' },
    { value: 'ң', label: 'Ңң' }, { value: 'о', label: 'Оо' }, { value: 'ө', label: 'Өө' },
    { value: 'п', label: 'Пп' }, { value: 'р', label: 'Рр' }, { value: 'с', label: 'Сс' },
    { value: 'т', label: 'Тт' }, { value: 'у', label: 'Уу' }, { value: 'ү', label: 'Үү' },
    { value: 'ў', label: 'Ўў' }, { value: 'ф', label: 'Фф' }, { value: 'x', label: 'Xx' },
    { value: 'ҳ', label: 'Ҳҳ' }, { value: 'ц', label: 'Цц' }, { value: 'ч', label: 'Чч' },
    { value: 'ш', label: 'Шш' }, { value: 'щ', label: 'Щщ' }, { value: 'ы', label: 'Ыы' },
    { value: 'э', label: 'Ээ' }, { value: 'ю', label: 'Юю' }, { value: 'я', label: 'Яя' },
]


export default function OftenSearchedWords() {
    const { wordList, isLoadingWords } = usePublicGetWords()
    const navigate = useNavigate()
    const isLatin = useSelector(selectIsLatin)

    const Alphabet = isLatin ? AlphabetLatin : AlphabetKiril

    function handleOftenSearchedWord(id) {
        navigate(`/soz/${id}`)
        document.getElementById('searchBar').scrollIntoView({behavior: 'smooth'})
    }

    function handleAlphabetWord(value) {
        navigate(`/wordlist/${value}`)
        document.getElementById('searchBar').scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div className='container'>
            <Card style={{ marginBottom: '5rem', boxShadow: '0 1px 5px 2px rgba(0,0,0, 0.1)' }}>
                <p style={{ color: '#229ED9', fontSize: '1.5rem', fontWeight: 'bold',  }}>
                    {isLatin ? 'Kóp qıdırılǵan sózler' : 'Көп қидирилған сөзлер'}
                </p>
                <div style={{ minHeight: '14rem' }}>
                    {isLoadingWords ?
                        <Skeleton title={false} paragraph={{ rows: 5 }} />
                        :
                        <ul className='often-searched-words'>
                            {wordList?.data?.map(word =>
                                <li
                                    key={word.id}
                                    className='often-searched-word'
                                    onClick={() => handleOftenSearchedWord(word.id)}
                                >
                                    {isLatin ? word.title.latin : word.title.kiril}
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </Card>

                <ul className='alphabet'>
                    { Alphabet.map(letter =>
                        <li
                            className='letter'
                            key={letter.label}
                            onClick={() => handleAlphabetWord(letter.value)}
                        >
                            {letter.label}
                        </li>
                    ) }
                </ul>

        </div>
    )
}


