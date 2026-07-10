import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const TimeSelect = ({ label, errorMessage, ref, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <select
        defaultValue=""
        className="rounded-lg border border-solid border-border px-4 py-3 text-sm outline-primary placeholder:text-sm placeholder:text-text-gray"
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
