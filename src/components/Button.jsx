const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white"
    }
    if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]"
    }
    if (variant === "ghost") {
      return "bg-transparent text-[#818181]"
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
