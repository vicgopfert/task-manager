import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const SidebarButton = ({ children, color }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-dark-blue",
        selected: "bg-primary/15 text-primary",
      },
    },
  })

  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["unselected", "selected"]),
}

export default SidebarButton
