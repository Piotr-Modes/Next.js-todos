import { useRecoilState, useSetRecoilState } from 'recoil'
import { todoListFilterState, searchInputState } from '../../recoil'

import { Label, Input } from '@rebass/forms'

const SearchBarFilter = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState)
  const [inputValue, setInputValue] = useRecoilState(searchInputState)
  const onChange = e => {
    const userInput = e.currentTarget.value
    setInputValue(userInput)
  }
  const onKeyDown = e => {
    filter !== 'Search' ? setFilter('Search') : null
  }
  return (
    <>
      <Label htmlFor="search">Search</Label>
      <Input
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id="search"
        name="search"
        placeholder="Search"
      />
    </>
  )
}

export default SearchBarFilter
