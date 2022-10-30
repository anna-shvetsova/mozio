import { useState, useEffect, Fragment, createElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Stack, Button} from '@mui/material'
import CitiesList from './CitiesList.js'
import ApplicationBar from './ApplicationBar.js'
import pages from '../data/pages.js'
import restr from '../data/restrictions.js'

export default function HomePage () {
  // console.log('render HomePage')
  let location = useLocation()
  const navigate = useNavigate()

  const itinerary = useSelector(state => state.itinerary)
  const another = useSelector(state => state.another)
  const [formCorrect, setFormCorrect] = useState(false)

  useEffect(() => {
    // console.log('check Form')

    const isAnotherCorrect = () => {
      for (const field in another) {
        if (!another[field].isCorrect) {
          return false
        }
      }
      return true
    }
    const isCorrect = itinerary.every(el => el.isCorrect) && isAnotherCorrect()
    setFormCorrect(isCorrect)
  }, [setFormCorrect, itinerary, another])

  const searchHandler = () => {
    const itineraryParam = `itinerary=${itinerary
      .map(el => el.cityId)
      .join(';')}`
    const anotherParams = Object.entries(another)
      .map(([key, value]) => {
        const formatURL = restr.getOption(key, 'formatURL')
        return `${key}=${formatURL(value.value)}`
      })
      .join('&')

    navigate(`${pages.getPathById('ResultsPage')}?${itineraryParam}&${anotherParams}`)
  }

  const fields = restr.getFields('startDate,peopleCount')

  return (
    <Fragment>
      <ApplicationBar curPath={location.pathname} />
      <form style={{ marginTop: '2em', marginLeft: '2em' }}>
        <Stack spacing={5} alignItems='flex-start'>
          <CitiesList />
          {fields.map(field => {
            const {
              id,
              component,
              required,
              label,
              defHelperText,
              validate
            } = field
            return createElement(component, {
              key: id,
              id,
              required,
              label,
              defHelperText,
              validate
            })
          })}
          <Button disabled={!formCorrect} onClick={searchHandler}>
            Search
          </Button>
        </Stack>
      </form>
    </Fragment>
  )
}
