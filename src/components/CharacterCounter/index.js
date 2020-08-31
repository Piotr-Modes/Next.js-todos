import { useRecoilValue } from 'recoil'
import { charCountState } from '../../recoil'

const CharacterCount = () => {
  const count = useRecoilValue(charCountState)

  return <>{count}</>
}

export default CharacterCount
