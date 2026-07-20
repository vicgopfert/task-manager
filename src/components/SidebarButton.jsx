import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { tv } from "tailwind-variants"

const SidebarButton = ({ children, to, color }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 rounded-lg px-6 py-3",
    variants: {
      color: {
        unselected: "text-dark-blue",
        selected: "bg-primary/15 text-primary",
      },
    },
  })

  if (to) {
    return (
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          sidebar({ color: isActive ? "selected" : "unselected" })
        }
      >
        {children}
      </NavLink>
    )
  }

  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  color: PropTypes.oneOf(["unselected", "selected"]),
}

export default SidebarButton
