import React, { Component } from 'react'
import moment from 'moment'

import Typography from 'instructure-ui/lib/components/Typography'
import ToggleDetails from 'instructure-ui/lib/components/ToggleDetails'
import Link from 'instructure-ui/lib/components/Link'

import IconAssignmentSolid from 'instructure-icons/lib/solid/IconAssignmentSolid'
import IconQuizSolid from 'instructure-icons/lib/solid/IconQuizSolid'
import IconDiscussionSolid from 'instructure-icons/lib/solid/IconDiscussionSolid'
import IconCalendarMonthSolid from 'instructure-icons/lib/solid/IconCalendarMonthSolid'

import propTypes from '../propTypes'

const { arrayOf, oneOf, shape, string } = React.PropTypes

const iconMap = {
  assignment: IconAssignmentSolid,
  quiz: IconQuizSolid,
  discussion_topic: IconDiscussionSolid,
}

export default class CalendarEvent extends Component {
  static propTypes = {
    event: propTypes.event.isRequired,
  }

  renderIcon () {
    const { type } = this.props.event
    const Icon = iconMap[type] || IconCalendarMonthSolid
    return <span className="calendar-event__icon" size="large" color="brand"><Icon /></span>
  }

  renderTitle () {
    const { assignment, title, html_url } = this.props.event
    return (
      <div className="calendar-event__title">
        {this.renderIcon()}
        {assignment && (<Typography color="secondary">Due {moment(assignment.due_at).format('LT')}<span style={{display: 'inline-block', width: '50px'}} /></Typography>)}
        <Typography>
          <Link target="_blank" title="open in Canvas" href={html_url}>{title}</Link>
        </Typography>
      </div>
    )
  }

  renderAssignmentContent () {
    const { assignment } = this.props.event
    if (assignment) {
      const { points_possible, grading_type, submission_types } = assignment

      return (
        <div>
          <Typography size="small">
            {grading_type === 'points'
              && (`${points_possible} pts`)
              || grading_type}
          </Typography>
          &nbsp;|&nbsp;
          <Typography size="small">
            <span style={{textTransform: 'capitalize'}}>
              {submission_types.map(sub => sub.replace(/_/g, ' ')).join(', ')}
            </span>
          </Typography>
        </div>
      )
    } else {
      return null
    }
  }

  renderContent () {
    const { description } = this.props.event

    return (
      <div className="calendar-event__content">
        {this.renderAssignmentContent()}
        <Typography size="small" color="secondary" as="div" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    )
  }

  render () {
    return (
      <div className="calendar-event">
        <ToggleDetails
          summary={this.renderTitle()}
        >
          {this.renderContent()}
        </ToggleDetails>
      </div>
    )
  }
}
