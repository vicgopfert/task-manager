import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

import { CheckIcon } from "../assets/icons"

const waterOption = tv({
  base: "flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition disabled:opacity-70",
  variants: {
    checked: {
      true: "bg-primary/15 text-dark-blue",
      false: "bg-dark-blue/5 text-dark-blue/80",
    },
  },
})

const waterCheckbox = tv({
  base: "flex h-5 w-5 items-center justify-center rounded-md",
  variants: {
    checked: {
      true: "bg-primary text-white",
      false: "bg-dark-blue/10",
    },
  },
})

const WaterItem = ({ label, checked, disabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={waterOption({ checked })}
    >
      <span className={waterCheckbox({ checked })}>
        {checked && <CheckIcon className="h-4 w-4" />}
      </span>
      {label}
    </button>
  )
}

WaterItem.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default WaterItem
