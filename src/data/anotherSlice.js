import { createSlice } from '@reduxjs/toolkit'
import restr from './restrictions'

const anotherSlice = createSlice({
  name: 'another',
  initialState: {
    startDate: {
      value: restr.getOption('startDate', 'defValue'),
      isCorrect: true
    },
    peopleCount: {
      value: restr.getOption('peopleCount', 'defValue'),
      isCorrect: true
    }
  },
  reducers: {
    updateItem (state, { payload: { id, value, isCorrect } }) {
      state[id] = {
        value,
        isCorrect
      }
    },
    updateItems (state, { payload: params }) {
      params.forEach(([key, value]) => {
        const options = restr.getOptions(key)
        if (!options) return 
        const {urlToValue, validate} = options
        state[key] = {
          value: urlToValue(value),
          isCorrect: validate(urlToValue(value))
        }
      })
    }
  }
})

export const { updateItem, updateItems } = anotherSlice.actions

export default anotherSlice.reducer
