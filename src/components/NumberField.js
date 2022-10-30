import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import { updateItem } from '../data/anotherSlice'

export default function NumberField ({
  id,
  required,
  label,
  defHelperText,
  validate
}) {
  // console.log('render NumberField')
  const dispatch = useDispatch()
  const another = useSelector(state => state.another)

  const [value, setValue] = useState(another[id].value)
  const [error, setError] = useState(!validate(another[id].value))
  const [helperText, setHelperText] = useState(error ? defHelperText : '')

  const changeHandler = useCallback(
    e => {
      let newValue = parseInt(e.target.value)
      if (isNaN(newValue)) {
        newValue = 0
      }
      setValue(newValue)

      const isCorrect = validate(newValue)
      setHelperText(isCorrect ? '' : defHelperText)
      setError(!isCorrect)

      dispatch(
        updateItem({
          id,
          value: newValue,
          isCorrect
        })
      )
    },
    [dispatch, defHelperText, id, validate]
  )

  return (
    <TextField
      id={id}
      type='number'
      required={required}
      value={value}
      onChange={val => changeHandler(val)}
      error={error}
      helperText={helperText}
      label={label}
      sx={{ width: 200 }}
    />
  )
}
