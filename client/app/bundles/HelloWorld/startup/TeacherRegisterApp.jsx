import React, { Component } from 'react'

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import 'instructure-ui/lib/themes/canvas'

import Typography from 'instructure-ui/lib/components/Typography'
import Heading from 'instructure-ui/lib/components/Heading'
import FormFieldGroup from 'instructure-ui/lib/components/FormFieldGroup'
import TextInput from 'instructure-ui/lib/components/TextInput'
import Button from 'instructure-ui/lib/components/Button'

class TeacherRegisterApp extends Component {
  componentDidMount () {
    microsoftTeams.initialize()
  }

  authenticate () {
    microsoftTeams.authentication.authenticate({
      url: '/auth?canvas_host=' + this.urlInput.value,
      width: '1000',
      height: '1000',
      successCallback: () => { window.location.replace('/teams/register_class') },
      failureCallback: () => { alert('failure :(') },
    })
  }

  onRegisterClick = () => {
    this.authenticate()
  }

  render () {
    return (
      <div>
        <FormFieldGroup description=" " label=" ">
          <Heading level="h1" color="primary-inverse">Register Canvas</Heading>
          <TextInput
            ref={(c) => { this.urlInput = c }}
            label={<Typography color="primary-inverse">Canvas URL:</Typography>}
            defaultValue="https://mattg.instructure.com"
          />
          <Button variant="primary" onClick={this.onRegisterClick}>Register</Button>
        </FormFieldGroup>
      </div>
    )
  }
}

export default TeacherRegisterApp
