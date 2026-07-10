const InputLabel = (props) => {
  return (
    <label className="text-sm font-semibold text-dark-blue" {...props}>
      {props.children}
    </label>
  )
}

export default InputLabel
