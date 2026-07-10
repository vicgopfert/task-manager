const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-primary text-white"
    }
    if (variant === "secondary") {
      return "bg-light-gray text-dark-blue"
    }
    if (variant === "ghost") {
      return "bg-transparent text-dark-gray"
    }
  }

  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs"
    }
    if (size === "large") {
      return "py-2 text-sm"
    }
  }

  const variantClasses = getVariantClasses()
  const sizeClasses = getSizeClasses()

  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md px-3 ${variantClasses} ${sizeClasses} ${className} font-semibold transition hover:opacity-75`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
