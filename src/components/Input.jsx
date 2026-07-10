import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const Input = ({ label, errorMessage, ref, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
}

export default Input
