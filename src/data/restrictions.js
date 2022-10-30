import moment from 'moment'
import DateField from '../components/DateField'
import NumberField from '../components/NumberField'

class Restrictions {
  fields = [
    {
      id: 'startDate',
      label: 'I would like to start on',
      label2: 'Start date:',
      component: DateField,
      type: 'moment',
      required: true,
      validate: val =>
        val >=
          moment()
            .startOf('day')
            .add(1, 'days'),
      defValue: moment()
        .startOf('day')
        .add(1, 'days'),
      defHelperText: 'Please enter any date in the future',
      formatURL: val => val.format('MM-DD-YYYY'),
      format: val => val.format('dddd, MMMM Do YYYY'),
      urlToValue: str => moment(str, 'MM-DD-YYYY')
    },
    {
      id: 'peopleCount',
      label: 'Number of people',
      label2: 'Number of people:',
      component: NumberField,
      type: 'number',
      required: true,
      validate: val => val > 0,
      defValue: 1,
      defHelperText: 'Please enter any positive number',
      formatURL: val => val,
      format: val => val,
      urlToValue: str => parseInt(str)
    },
    {
      id: 'itineraryFirst',
      label: 'I plan my trip to begin in',
      label2: '',
      required: true,
      validate: val => val !== null,
      defValue: null,
      defHelperText: 'Please fill out a place',
      addButton: true,
      delButton: false
    },
    {
      id: 'itineraryIntermediate',
      label: 'then continue in',
      label2: '',
      required: false,
      validate: val => val !== null,
      defValue: null,
      defHelperText: 'Please fill out a place',
      addButton: true,
      delButton: true
    },
    {
      id: 'itineraryLast',
      label: 'and happily end in',
      label2: '',
      required: true,
      validate: val => val !== null,
      defValue: null,
      defHelperText: 'Please fill out a place',
      addButton: false,
      delButton: false
    }
  ]

  exists = fieldId => {
    return this.fields.findIndex(el => el.id === fieldId) > -1
  }

  getFields = str => {
    return this.fields.filter(el => str.split(',').includes(el.id))
  }

  getOptions = field => {
    return this.fields.find(el => el.id === field)
  }

  getOption = (field, option) => {
    return this.fields.find(el => el.id === field)[option]
  }
}

export default new Restrictions()
