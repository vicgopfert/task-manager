import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"

import { LoaderIcon } from "../assets/icons"
import { useClearTasks } from "../hooks/data/use-clear-tasks"
import Button from "./Button"

const ClearTasksDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef(null)
  const { mutate: clearTasks, isPending: isClearing } = useClearTasks()

  const handleClearClick = () => {
    clearTasks(undefined, {
      onSuccess: () => {
        toast.success("Tarefas limpas com sucesso!")
        handleClose()
      },
      onError: () => {
        toast.error("Erro ao limpar tarefas")
      },
    })
  }

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={200}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed top-0 bottom-0 left-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow">
          <h2 className="text-xl font-semibold text-dark-blue">
            Limpar tarefas
          </h2>

          <p className="my-1 mb-4 w-84 text-sm text-text-gray">
            Tem certeza que deseja apagar todas as tarefas? Essa ação não pode
            ser desfeita.
          </p>

          <div className="flex gap-3">
            <Button
              color="secondary"
              size="large"
              className="w-full"
              type="button"
              onClick={handleClose}
              disabled={isClearing}
            >
              Cancelar
            </Button>

            <Button
              size="large"
              className="w-full bg-danger"
              type="button"
              onClick={handleClearClick}
              disabled={isClearing}
            >
              {isClearing ? (
                <LoaderIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Limpar"
              )}
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

ClearTasksDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ClearTasksDialog
