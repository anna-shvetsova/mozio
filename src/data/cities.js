class Cities {
  cities = [
    { id: '1', title: 'Paris', latitude: 48.856614, longitude: 2.352222 },
    { id: '2', title: 'Marseille', latitude: 43.296482, longitude: 5.36978 },
    { id: '3', title: 'Lyon', latitude: 45.764043, longitude: 4.835659 },
    { id: '4', title: 'Toulouse', latitude: 43.604652, longitude: 1.444209 },
    { id: '5', title: 'Nice', latitude: 43.710173, longitude: 7.261953 },
    { id: '6', title: 'Nantes', latitude: 47.218371, longitude: -1.553621 },
    { id: '7', title: 'Strasbourg', latitude: 48.573405, longitude: 7.752111 },
    { id: '8', title: 'Montpellier', latitude: 43.610769, longitude: 3.876716 },
    { id: '9', title: 'Bordeaux', latitude: 44.837789, longitude: -0.57918 },
    { id: '10', title: 'Lille', latitude: 50.62925, longitude: 3.057256 },
    { id: '11', title: 'Rennes', latitude: 48.117266, longitude: -1.677793 },
    { id: '12', title: 'Reims', latitude: 49.258329, longitude: 4.031696 },
    { id: '13', title: 'Le Havre', latitude: 49.49437, longitude: 0.107929 },
    {
      id: '14',
      title: 'Saint-Étienne',
      latitude: 45.439695,
      longitude: 4.387178
    },
    { id: '15', title: 'Toulon', latitude: 43.124228, longitude: 5.928 },
    { id: '16', title: 'Angers', latitude: 47.478419, longitude: -0.563166 },
    { id: '17', title: 'Grenoble', latitude: 45.188529, longitude: 5.724524 },
    { id: '18', title: 'Dijon', latitude: 47.322047, longitude: 5.04148 },
    { id: '19', title: 'Nîmes', latitude: 43.836699, longitude: 4.360054 },
    {
      id: '20',
      title: 'Aix-en-Provence',
      latitude: 43.529742,
      longitude: 5.447427
    }
  ]

  getSorted = () => {
    return this.cities.sort((a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
  }

  exists = cityId => {
    return this.cities.findIndex(el => el.id === cityId) > -1
  }

  getById = cityId => {
    const city = this.cities.find(el => el.id === cityId)
    return city ? city : null 
  }
}

const haversine = (
  { latitude: lat1, longitude: lon1 },
  { latitude: lat2, longitude: lon2 }
) => {
  const degToRadians = deg => {
    return (deg * Math.PI) / 180
  }
  const R = 6371000 // radius of Earth in meters

  const phi_1 = degToRadians(lat1)
  const phi_2 = degToRadians(lat2)

  const delta_phi = degToRadians(lat2 - lat1)
  const delta_lambda = degToRadians(lon2 - lon1)

  const a =
    Math.sin(delta_phi / 2.0) ** 2 +
    Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(delta_lambda / 2.0) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const meters = R * c // output distance in meters

  return Math.round(meters / 1000)
}

export default new Cities()
export { haversine }
