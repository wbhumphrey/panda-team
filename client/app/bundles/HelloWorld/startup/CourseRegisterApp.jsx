import React, { Component } from 'react'

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import 'instructure-ui/lib/themes/canvas'

import Typography from 'instructure-ui/lib/components/Typography'
import Heading from 'instructure-ui/lib/components/Heading'
import FormFieldGroup from 'instructure-ui/lib/components/FormFieldGroup'
import TextInput from 'instructure-ui/lib/components/TextInput'
import Select from 'instructure-ui/lib/components/Select'
import Button from 'instructure-ui/lib/components/Button'
import PropTypes from 'prop-types'

const HOST = 'https://panda-team-edge.inseng.net'
const { arrayOf, shape, string, number } = PropTypes

class CourseRegisterApp extends Component {
  static propTypes = {
    courses: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
    })).isRequired
  }

  componentDidMount () {
    microsoftTeams.initialize()

    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      microsoftTeams.settings.setSettings({
        entityId: "course_" + this.courseSelect.value,
        contentUrl: HOST + "/calendar?entity_id={entityId}",
  //      contentUrl: HOST + "/api/values?name={upn}&tenant={tid}&group={groupId}&entity={entityId}",
        suggestedDisplayName: "Canvas",
  //      websiteUrl: HOST + "/api/values?name={upn}&tenant={tid}&group={groupId}&entity={entityId}",
  //      removeUrl: HOST + "/remove.html"
      });
      saveEvent.notifySuccess();
    })

    this.onChange()
  }

  onChange = () => {
    console.log('submit::', this.courseSelect.value);
    microsoftTeams.settings.setValidityState(this.courseSelect.value != "");
  }

  render () {
    return (
      <div>
        <FormFieldGroup description=" " label=" ">
          <Heading level="h1" color="primary-inverse">Register Course</Heading>
          <Select
            onChange={this.onChange}
            ref={(c) => { this.courseSelect = c }}
            label={<Typography color="primary-inverse">Choose Course:</Typography>}
          >
            {this.props.courses.map(course => (<option key={course.id} value={course.id}>{course.name}</option>))}
          </Select>
        </FormFieldGroup>
      </div>
    )
  }
}

export default CourseRegisterApp
