import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const nodeRef = useRef(null)
  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const resetForm = () => {
    titleRef.current.value = ""
    timeRef.current.value = ""
    descriptionRef.current.value = ""
    setErrors([])
  }

  const addTask = async (newTask) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa")
      }
      onSubmitSuccess(newTask)
      return true
    } catch (error) {
      console.error(error)
      toast.error("Erro ao adicionar tarefa")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveClick = async () => {
    const newErrors = []

    const title = titleRef.current.value.trim()
    const time = timeRef.current.value
    const description = descriptionRef.current.value.trim()

    if (!title) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }
    if (!time) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório.",
      })
    }
    if (!description) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    const success = await addTask({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    })

    if (success) {
      handleClose()
    }
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={200}
      classNames="add-task-dialog"
      unmountOnExit
      onExit={resetForm}
    >
      <div
        ref={nodeRef}
        className="fixed top-0 bottom-0 left-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow">
          <h2 className="text-xl font-semibold text-dark-blue">Nova Tarefa</h2>

          <p className="my-1 mb-4 text-sm text-text-gray">
            Insira as informações abaixo
          </p>

          <div className="flex w-84 flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Título da tarefa"
              errorMessage={titleError?.message}
              ref={titleRef}
              disabled={isLoading}
            />

            <TimeSelect
              id="time"
              label="Horário"
              errorMessage={timeError?.message}
              ref={timeRef}
              disabled={isLoading}
            />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
              disabled={isLoading}
            />

            <div className="flex gap-3">
              <Button
                color="secondary"
                size="large"
                className="w-full"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                size="large"
                className="w-full"
                onClick={handleSaveClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
}

export default AddTaskDialog
