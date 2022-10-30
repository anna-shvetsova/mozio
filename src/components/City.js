import { useDispatch } from 'react-redux'
import { Stack, Button } from '@mui/material/'
import CityCombo from './CityCombo'
import restr from '../data/restrictions.js'
import { addItineraryItem, removeItineraryItem } from '../data/itinerarySlice.js'

export default function City ({ id, defaultId, optionsName }) {
  const dispatch = useDispatch()

  const options = restr.getOptions(optionsName)

  const addStopHandler = () => {
    dispatch(addItineraryItem({ id }))
  }

  const delStopHandler = () => {
    dispatch(removeItineraryItem({ id }))
  }

  return (
    <Stack direction='row' spacing={3} alignItems='flex-end'>
      <CityCombo
        id={id}
        required={options.required}
        defaultId={defaultId}
        label={options.label}
        defHelperText={options.defHelperText}
        validate={options.validate}
      />
      {options.addButton && <Button onClick={addStopHandler}>Add stop</Button>}
      {options.delButton && <Button onClick={delStopHandler}>Del stop</Button>}
    </Stack>
  )
}
