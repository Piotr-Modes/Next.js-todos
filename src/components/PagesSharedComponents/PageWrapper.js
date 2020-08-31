import { Box } from 'rebass'

const PageWrapper = (props) => {
  return (
    <Box
      as={'main'}
      sx={{
        p: 4,
        color: 'text',
        bg: 'background',
        maxWidth: '700px',
        margin: '0 auto',
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      }}
      mt={4}
    >
      {props.children}
    </Box>
  )
}

export default PageWrapper
