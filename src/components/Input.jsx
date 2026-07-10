import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const Input = ({ label, errorMessage, ref, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-border px-4 py-3 outline-primary placeholder:text-sm placeholder:text-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
}

export default Input
