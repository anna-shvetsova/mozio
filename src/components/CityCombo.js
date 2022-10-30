import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Autocomplete } from '@mui/material/'
import cities from '../data/cities.js'
import { updateItineraryItem } from '../data/itinerarySlice.js'

export default function CityCombo ({
  id,
  defaultId,
  required,
  label,
  defHelperText,
  validate
}) {
  const dispatch = useDispatch()

  const defaultProps = {
    options: cities.getSorted(),
    getOptionLabel: option => option.title,
    isOptionEqualToValue: (option, value) => {
      return option.title === value.title
    },
    sx: { width: 200 }
  }

  const handleChange = (e, newValue) => {
    setValue(newValue)
    const isCorrect = validate(newValue)
    setHelperText(isCorrect ? '' : defHelperText)
    setError(!isCorrect)
    dispatch(updateItineraryItem({ id, cityId: newValue?.id, isCorrect }))
  }

  const [value, setValue] = useState(cities.getById(defaultId))
  const [error, setError] = useState(!cities.exists(defaultId))
  const [helperText, setHelperText] = useState(error ? defHelperText : '')

  return (
    <Autocomplete
      {...defaultProps}
      id='auto-highlight'
      autoHighlight
      onChange={handleChange}
      value={value}
      renderInput={params => (
        <TextField
          {...params}
          required={required}
          label={label}
          error={error}
          helperText={helperText}
          variant='standard'
        />
      )}
    />
  )
}
