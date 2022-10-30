import HomePage from '../components/HomePage'
import ErrorPage from '../components/ErrorPage'
import ResultsPage from '../components/ResultsPage'

class Pages {
  pages = [
    {
      id: 'HomePage',
      path: '/',
      // path: '/mozio/',
      element: <HomePage />,
      title: 'Home',
      errorElement: <ErrorPage />
    },
    {
      id: 'ResultsPage',
      path: '/results',
      // path: '/mozio/results',
      element: <ResultsPage />,
      title: 'Search result'
    }
  ]

  get = keys => {
    if (!keys) {
      return [...this.pages]
    }
    return this.pages.map(el => {
      const obj = {}
      keys.forEach(key => {
        obj[key] = el[key]
      })
      return obj
    })
  }

  getPathById = id => {
    return this.pages.find(el => el.id === id).path
  }

}

export default new Pages()
