import { useRouteError, Link } from 'react-router-dom'
import { Stack, Typography, Box } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import pages from '../data/pages'

export default function ErrorPage () {
  const error = useRouteError()

  return (
    <Box
      mt={4}
      ml={4}
      sx={{
        width: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Stack justifyContent='center' alignItems='center' spacing={3}>
        <ErrorOutlineIcon color='error' fontSize='large' />
        <Stack alignItems='center'>
          <Typography variant='h2' color='error'>
            {error.status}
          </Typography>
          <Typography sx={{ marginTop: 0 }} variant='subtitle1' color='error'>
            {error.statusText}
          </Typography>
        </Stack>
        <Typography sx={{ textAlign: 'center' }} variant='subtitle1' color='primary' gutterBottom>
          Looks like the page doesn't exist,<br/> but you always can start{' '}
          <Link to={pages.getPathById('HomePage')}>here</Link>
        </Typography>
      </Stack>
    </Box>
  )
}
