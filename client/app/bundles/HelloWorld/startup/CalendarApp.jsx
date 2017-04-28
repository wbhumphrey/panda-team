import React, { Component } from 'react'
import axios from 'axios'

import Spinner from 'instructure-ui/lib/components/Spinner'
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import 'instructure-ui/lib/themes/canvas'

import Calendar from 'rc-calendar'
import 'rc-calendar/dist/rc-calendar.css'

import DayEventList from '../components/DayEventList'

// import { arrayOf, shape } = React.PropTypes

class CalendarApp extends Component {
  static propTypes = {

  }

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      days: []
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    axios.get('/teams')
      .then(res => {
        const events = res.data
        const days = events.reduce((map, event) => {
          const day = event.all_day_date
          map[day] = map[day] || []
          map[day].push(event)
          return map
        }, {})
        console.log('days:', days)
        this.setState({ isLoading: false, days })
      })
      .catch(err => {
        this.setState({ isLoading: false })
        console.log('API error:', err)
      })
  }

  onDaySelect = () => {

  }

  renderEvents () {
    const { days } = this.state
    return Object.keys(days)
      .map(day => <DayEventList key={day} day={day} events={days[day]} />)
  }

  render () {
    return (
      <div>
        {this.state.isLoading
          && (<Spinner title="Loading Calendar Data" />)
          || this.renderEvents()
        }
        <div className="floating-calendar">
          <Calendar
            onSelect={this.onDaySelect}
          />
        </div>
      </div>
    )
  }
}

export default CalendarApp
