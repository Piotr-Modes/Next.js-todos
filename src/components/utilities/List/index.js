import React from 'react'
import StyledList from './Styles'

const List = props => {
  return <StyledList>{props.list.map((item, index) => props.listRenderer(item, index))}</StyledList>
}

export default List
