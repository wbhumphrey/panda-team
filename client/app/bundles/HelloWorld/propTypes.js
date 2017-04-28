import { PropTypes } from 'react'

const { shape, oneOf, string } = PropTypes
const propTypes = {}

propTypes.event = shape({
  title: string.isRequired,
  type: oneOf(['event', 'assignment', 'quiz']).isRequired,
  assignment: shape({
    due_at: string.isRequired,
  }),
})

export default propTypes
