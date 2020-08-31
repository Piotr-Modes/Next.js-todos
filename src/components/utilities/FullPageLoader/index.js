import { Spinner } from 'theme-ui'
import { Box } from 'rebass'

const FullPageLoader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Spinner />
    </Box>
  )
}

export default FullPageLoader
