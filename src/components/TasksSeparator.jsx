const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-border pb-1">
      {icon}
      <p className="text-sm text-text-gray">{title}</p>
    </div>
  )
}

export default TasksSeparator
