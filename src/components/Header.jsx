import PropTypes from "prop-types"
import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import ClearTasksDialog from "./ClearTasksDialog"

const Header = ({ subtitle, title }) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const [clearTasksDialogIsOpen, setClearTasksDialogIsOpen] = useState(false)

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-primary">{subtitle}</span>

        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={() => setClearTasksDialogIsOpen(true)}>
          Limpar Tarefas
          <TrashIcon />
        </Button>

        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          Nova Tarefa
          <AddIcon />
        </Button>

        <AddTaskDialog
          isOpen={addTaskDialogIsOpen}
          handleClose={() => setAddTaskDialogIsOpen(false)}
        />

        <ClearTasksDialog
          isOpen={clearTasksDialogIsOpen}
          handleClose={() => setClearTasksDialogIsOpen(false)}
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
