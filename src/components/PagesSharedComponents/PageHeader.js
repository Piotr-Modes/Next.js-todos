import { Heading } from 'rebass'

const PageHeader = ({ headerText }) => {
  return (
    <Heading sx={{ fontSize: [45, 60, 75] }} variant="display" textAlign="center">
      {headerText}
    </Heading>
  )
}

export default PageHeader
