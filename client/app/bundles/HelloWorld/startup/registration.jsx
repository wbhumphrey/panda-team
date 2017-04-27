import ReactOnRails from 'react-on-rails';

import HelloWorldApp from './HelloWorldApp';
import TeacherRegisterApp from './TeacherRegisterApp';
import CourseRegisterApp from './CourseRegisterApp';
import CalendarApp from './CalendarApp';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorldApp,
  TeacherRegisterApp,
  CourseRegisterApp,
  CalendarApp,
});
