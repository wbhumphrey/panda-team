import React, { Component } from 'react'
import moment from 'moment'

import CalendarEvent from './CalendarEvent'
import Heading from 'instructure-ui/lib/components/Heading'

import propTypes from '../propTypes'

const { arrayOf, oneOf, shape, string } = React.PropTypes

export default class DayEventList extends Component {
  static propTypes = {
    day: string.isRequired,
    events: arrayOf(propTypes.event).isRequired,
  }

  render () {
    return (
      <div className="calendar-day" id={`day-${this.props.day}`}>
        <Heading level="h4">{moment(this.props.day).format('ddd, MMMM D')}</Heading>
        {this.props.events.map(event => <CalendarEvent key={event.id} event={event} />)}
      </div>
    )
  }
}
