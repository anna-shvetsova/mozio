import { useState, useEffect, useRef, Fragment } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { Box, Stack, Typography, CircularProgress } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ApplicationBar from './ApplicationBar'
import { haversine } from '../data/cities'
import { rewriteItinerary } from '../data/itinerarySlice'
import { updateItems } from '../data/anotherSlice'
import cities from '../data/cities'
import restr from '../data/restrictions'

export default function ResultsPage () {
  // console.log('render ResultsPage')

  let location = useLocation()
  let [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const itineraryOutputData = useRef([])
  const totalDistance = useRef(0)
  const anotherOutputData = useRef([])

  const getItineraryOutputData = itineraryParam => {
    if (!itineraryParam) {
      return "Sorry, can't find itinerary"
    }
    if (itineraryParam.split(';').find(el => el === '18')) {
      return "Sorry, can't calculate distance from/to Dijon"
    }

    const getItineraryOutputItem = (cityId, prevCoords) => {
      const city = cities.getById(cityId)
      if (!city) {
        return { city: '(not found)', distance: '(unknown)', coords: null }
      }
      const { latitude, longitude } = city
      const coords = { latitude, longitude }
      const distance = prevCoords ? haversine(prevCoords, coords) : '(unknown)'

      return { city: city.title, distance, coords }
    }

    let prevCoords
    let totalDistance = 0

    return {
      itineraryOutputData: itineraryParam.split(';').map(item => {
        const { city, distance, coords } = getItineraryOutputItem(
          item,
          prevCoords
        )
        totalDistance += isNaN(distance) ? 0 : distance
        prevCoords = coords
        return {
          id: item,
          city,
          distance
        }
      }),
      totalDistance
    }
  }

  useEffect(() => {
    if (!searchParams) {
      return
    }

    const itineraryParam = searchParams.get('itinerary')
    if (itineraryParam) {
      dispatch(rewriteItinerary(itineraryParam))
    }

    let anotherParams = []
    for (let entry of searchParams.entries()) {
      const paramKey = entry[0]
      if (
        restr.exists(paramKey) &&
        anotherParams.findIndex(([key]) => key === paramKey) === -1
      ) {
        anotherParams.push(entry)
      }
    }
    anotherParams = anotherParams.filter(([key]) =>
      ['startDate', 'peopleCount'].includes(key)
    )
    if (anotherParams.length > 0) {
      dispatch(updateItems(anotherParams))
    }

    anotherOutputData.current = anotherParams

    const getItineraryOutputDataDelay = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const res = getItineraryOutputData(itineraryParam)
          if (typeof res === 'string') {
            reject(res)
          } else {
            resolve(res)
          }
        }, 2000)
      })
    }

    getItineraryOutputDataDelay().then(
      value => {
        itineraryOutputData.current = value.itineraryOutputData
        totalDistance.current = value.totalDistance
        setLoading(false)
      },
      reason => {
        setLoading(false)
        setError(reason)
      }
    )
  }, [dispatch])

  return (
    <Fragment>
      <ApplicationBar curPath={location.pathname} />
      <Stack ml={4} mt={4} spacing={4}>
        {loading ? (
          <Box
            sx={{
              width: 350,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              width: 350,
              height: 150,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Stack justifyContent='center' alignItems='center' spacing={2}>
              <ErrorOutlineIcon color='error' fontSize='large' />
              <Typography variant='subtitle1' color='error' gutterBottom>
                {error}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <div>
            {itineraryOutputData.current.map((item, idx) => {
              return (
                <Fragment key={nanoid(8)}>
                  {idx !== 0 && (
                    <Typography variant='subtitle1' gutterBottom>
                      {item.distance} km
                    </Typography>
                  )}
                  <Typography variant='h6' gutterBottom>
                    {item.city}
                  </Typography>
                </Fragment>
              )
            })}
            <Typography variant='subtitle1' gutterBottom>
              Total distance: {totalDistance.current} km
            </Typography>
          </div>
        )}

        {anotherOutputData.current.map(([key, param]) => {
          const { label2: label, urlToValue, format } = restr.getOptions(key)
          return (
            <Stack key={key} direction='row' alignItems='baseline' spacing={1}>
              <Typography variant='subtitle1' gutterBottom>
                {label}
              </Typography>
              <Typography variant='h6' gutterBottom>
                {format(urlToValue(param))}
              </Typography>
            </Stack>
          )
        })}
      </Stack>
    </Fragment>
  )
}
