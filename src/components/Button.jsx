import { tv } from "tailwind-variants"

const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: "flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75",
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

export default Button
