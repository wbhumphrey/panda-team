import React, { Component } from 'react'

import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme'
import 'instructure-ui/lib/themes/canvas'

import Typography from 'instructure-ui/lib/components/Typography'
import Heading from 'instructure-ui/lib/components/Heading'
import FormFieldGroup from 'instructure-ui/lib/components/FormFieldGroup'
import TextInput from 'instructure-ui/lib/components/TextInput'
import Select from 'instructure-ui/lib/components/Select'
import Button from 'instructure-ui/lib/components/Button'

const HOST = 'https://bdb8eddb.ngrok.io';
const { arrayOf, shape, string } = React.PropTypes

class CourseRegisterApp extends Component {
  static propTypes = {
    courses: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
    })).isRequired
  }

  componentDidMount () {
    microsoftTeams.initialize()

    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
      microsoftTeams.settings.setSettings({
        entityId: this.courseSelect.value,
        contentUrl: HOST + "/teams/course/{entityId}",
  //      contentUrl: HOST + "/api/values?name={upn}&tenant={tid}&group={groupId}&entity={entityId}",
        suggestedDisplayName: "Canvas",
  //      websiteUrl: HOST + "/api/values?name={upn}&tenant={tid}&group={groupId}&entity={entityId}",
  //      removeUrl: HOST + "/remove.html"
      });
      saveEvent.notifySuccess();
    })
  }

  authenticate () {

  }

  onSubmit = () => {
    microsoftTeams.settings.setValidityState(this.courseSelect.value != "");
  }

  render () {
    return (
      <div>
        <FormFieldGroup description=" " label=" ">
          <Heading level="h1" color="primary-inverse">Register Course</Heading>
          <Select
            ref={(c) => { this.courseSelect = c }}
            label={<Typography color="primary-inverse">Choose Course:</Typography>}
          >
            {this.props.courses.map(course => (<option value={course.id}>{course.name}</option>))}
          </Select>
          <Button variant="primary" onClick={this.onSubmit}>Submit</Button>
        </FormFieldGroup>
      </div>
    )
  }
}

export default CourseRegisterApp
