import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const nodeRef = useRef(null)
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
  })

  const addTask = async (newTask) => {
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
    }
  }

  const handleSaveClick = async (data) => {
    const title = data.title.trim()
    const time = data.time.trim()
    const description = data.description.trim()

    const success = await addTask({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    })

    if (success) {
      handleClose()
      reset()
    }
  }

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={200}
      classNames="add-task-dialog"
      unmountOnExit
      onExit={() => reset()}
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

          <form
            onSubmit={handleSubmit(handleSaveClick)}
            className="flex w-84 flex-col space-y-4"
          >
            <Input
              id="title"
              label="Título"
              placeholder="Título da tarefa"
              {...register("title", {
                required: "O título é obrigatório",
                validate: (value) =>
                  value.trim() !== "" || "O título não pode estar vazio",
              })}
              errorMessage={errors?.title?.message}
              disabled={isSubmitting}
            />

            <TimeSelect
              id="time"
              label="Horário"
              errorMessage={errors?.time?.message}
              {...register("time", {
                required: "O horário é obrigatório",
                validate: (value) =>
                  value.trim() !== "" || "O horário não pode estar vazio",
              })}
              disabled={isSubmitting}
            />

            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              errorMessage={errors?.description?.message}
              {...register("description", {
                required: "A descrição é obrigatória",
                validate: (value) =>
                  value.trim() !== "" || "A descrição não pode estar vazio",
              })}
              disabled={isSubmitting}
            />

            <div className="flex gap-3">
              <Button
                color="secondary"
                size="large"
                className="w-full"
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>

              <Button
                size="large"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </form>
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
