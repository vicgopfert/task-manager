import PropTypes from "prop-types"

const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-border pb-1">
      {icon}
      <p className="text-sm text-text-gray">{title}</p>
    </div>
  )
}

TasksSeparator.propTypes = {
  title: PropTypes.node.isRequired,
  icon: PropTypes.element.isRequired,
}

export default TasksSeparator
