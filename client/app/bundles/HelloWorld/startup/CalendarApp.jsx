import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

import Spinner from 'instructure-ui/lib/components/Spinner'
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import 'instructure-ui/lib/themes/canvas'

import Calendar from 'rc-calendar'
import 'rc-calendar/dist/rc-calendar.css'

import DayEventList from '../components/DayEventList'

class CalendarApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      days: []
    }
  }

  componentDidMount () {
    window.location.hash = ''
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
        this.setState({ isLoading: false, days })
      })
      .catch(err => {
        this.setState({ isLoading: false })
        console.log('API error:', err)
      })
  }

  componentDidUpdate (prevProps, prevState) {
    // just finished loading
    if (!this.state.isLoading && prevState.isLoading) {
      const today = moment().format('YYYY-MM-DD')
      const days = Object.keys(this.state.days)
      const firstDay = days.length ? days[0] : null
      const focusDay = this.state.days[today] ? today : firstDay
      this.focusDay(focusDay)
    }
  }

  focusDay (day) {
    window.location.hash = `#day-${day}`
  }

  onDaySelect = (day) => {
    this.focusDay(day.format('YYYY-MM-DD'))
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
