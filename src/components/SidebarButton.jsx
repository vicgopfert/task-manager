const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-dark-blue"
    }

    if (variant === "selected") {
      return "bg-primary/15 text-primary"
    }
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  )
}

export default SidebarButton
