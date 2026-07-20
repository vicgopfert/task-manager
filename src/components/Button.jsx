import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: `flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75 ${rest.disabled && "cursor-not-allowed opacity-50"}`,
    variants: {
      color: {
        primary: "bg-primary text-white",
        secondary: "bg-light-gray text-dark-blue",
        ghost: "bg-transparent text-dark-gray",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
}

export default Button
