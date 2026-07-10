import "./AddTaskDialog.css"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

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

  const handleSaveClick = () => {
    const newErrors = []

    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
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
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    })

    handleClose()
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
            />

            <TimeSelect
              id="time"
              label="Horário"
              errorMessage={timeError?.message}
              ref={timeRef}
            />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />

            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="large"
                className="w-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>

              <Button size="large" className="w-full" onClick={handleSaveClick}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskDialog
