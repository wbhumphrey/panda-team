import React, { Component } from 'react'

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import 'instructure-ui/lib/themes/canvas'

import Calendar from 'rc-calendar'
import 'rc-calendar/dist/rc-calendar.css'


// import Typography from 'instructure-ui/lib/components/Typography'
// import Heading from 'instructure-ui/lib/components/Heading'
// import FormFieldGroup from 'instructure-ui/lib/components/FormFieldGroup'
// import TextInput from 'instructure-ui/lib/components/TextInput'
// import Select from 'instructure-ui/lib/components/Select'
// import Button from 'instructure-ui/lib/components/Button'
//
// import { arrayOf, shape } = React.PropTypes

class CalendarApp extends Component {
  static propTypes = {

  }

  render () {
    return (
      <div>
        <Calendar />
      </div>
    )
  }
}

export default CalendarApp
