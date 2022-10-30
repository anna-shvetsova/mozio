// import reportWebVitals from './reportWebVitals'
import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { store } from './data/store.js'
import pages from './data/pages'

// const router = createBrowserRouter(pages.get(['path', 'element', 'errorElement']))
const router = createBrowserRouter(
  pages.get(['path', 'element', 'errorElement']),
  { basename: '/mozio/' }
)

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </LocalizationProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
