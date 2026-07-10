import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const TimeSelect = ({ label, errorMessage, ref, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <select
        defaultValue=""
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 text-sm outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        ref={ref}
        {...rest}
      >
        <option value="" disabled>
          Selecione um horário
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
}

export default TimeSelect
