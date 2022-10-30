import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { updateItem } from '../data/anotherSlice'
import TextField from '@mui/material/TextField'

export default function DateField ({
  id,
  required,
  label,
  defHelperText,
  validate
}) {
  // console.log('render DataField')
  const dispatch = useDispatch()
  const another = useSelector(state => state.another)

  const [value, setValue] = useState(another[id].value)
  const [error, setError] = useState(!validate(another[id].value))
  const [helperText, setHelperText] = useState(error ? defHelperText : '')

  const changeHandler = useCallback(newValue => {
    setValue(newValue)
    const isCorrect = validate(newValue)
    setHelperText(isCorrect ? '' : defHelperText)
    setError(!isCorrect)
    dispatch(updateItem({ id, value: newValue, isCorrect }))
  }, [dispatch, defHelperText, id, validate])

  return (
    <DesktopDatePicker
      label={label}
      inputFormat='MM/DD/YYYY'
      value={value}
      onChange={val => changeHandler(val)}
      renderInput={params => (
        <TextField
          {...params}
          id={id}
          required={required}
          error={error}
          helperText={helperText}
          sx={{width: 200}}
        />
      )}
    />
  )
}
