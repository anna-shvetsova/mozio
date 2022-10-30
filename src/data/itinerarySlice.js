import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import cities from './cities'

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: [
    // { id: nanoid(8), cityId: '1', isCorrect: true },
    // { id: nanoid(8), cityId: '5', isCorrect: true },
    // { id: nanoid(8), cityId: '20', isCorrect: true }
    { id: nanoid(8), cityId: null, isCorrect: false },
    { id: nanoid(8), cityId: null, isCorrect: false },
  ],
  reducers: {
    addItineraryItem (state, { payload: { id } }) {
      const idx = state.findIndex(el => el.id === id)
      if (idx > -1) {
        state.splice(idx + 1, 0, { id: nanoid(8), cityId: undefined })
      }
    },
    removeItineraryItem (state, { payload: { id } }) {
      const idx = state.findIndex(el => el.id === id)
      if (idx > -1) {
        state.splice(idx, 1)
      }
    },
    updateItineraryItem (state, { payload: { id, cityId, isCorrect } }) {
      const item = state.find(el => el.id === id)
      if (item) {
        item.cityId = cityId
        item.isCorrect = isCorrect
      }
    },
    rewriteItinerary (state, { payload: cityIds }) {
      return cityIds.split(';').map(cityId => {
        const cityExists = cities.exists(cityId)
        return { id: nanoid(8), cityId: cityExists ? cityId : null, isCorrect: cityExists }
      })
    }
  }
})

export const {
  addItineraryItem,
  removeItineraryItem,
  updateItineraryItem,
  rewriteItinerary
} = itinerarySlice.actions
export default itinerarySlice.reducer
