import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import City from './City.js'

export default function CitiesList () {
  // console.log('render CitiesList')
  const itinerary = useSelector(state => state.itinerary)

  return (
    <Stack spacing={3}>
      {itinerary.map((el, idx, arr) => {
        const isFirst = idx === 0
        const isLast = idx === arr.length - 1
        return (
          <City
            key={`${el.id}`}
            id={el.id}
            defaultId={el.cityId}
            optionsName = {isFirst ? 'itineraryFirst' : isLast ? 'itineraryLast' : 'itineraryIntermediate'}
          />
        )
      })}
    </Stack>
  )
}
