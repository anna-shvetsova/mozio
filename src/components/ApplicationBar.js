import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Container, Toolbar, Box, Button } from '@mui/material/'
import pages from '../data/pages.js'

function ApplicationBar ({ curPath }) {
  // console.log('render ApplicationBar')

  const navigate = useNavigate()

  const pages_ = pages.get(['id', 'title', 'path'])
  const [curPageId, setCurPageId] = useState(
    pages_.find(page => page.path === curPath).id
  )

  const handleNavMenu = pageId => {
    setCurPageId(pageId)
    navigate(pages_.find(page => page.id === pageId).path)
  }

  return (
    <Fragment>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              {pages_.map(page => (
                <Button
                  key={page.id}
                  variant={page.id === curPageId ? 'outlined' : 'text'}
                  onClick={() => handleNavMenu(page.id)}
                  sx={{
                    my: 2,
                    color: page.id === curPageId ? 'rgb(51,51,51)' : 'white',
                    display: 'block'
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  )
}
export default ApplicationBar
