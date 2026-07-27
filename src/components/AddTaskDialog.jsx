import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import { useAddTask } from "../hooks/data/use-add-task"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask, isPending: isCreating } = useAddTask()

  const nodeRef = useRef(null)
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
  })

  const handleSaveClick = (data) => {
    const title = data.title.trim()
    const time = data.time.trim()
    const description = data.description.trim()

    const task = {
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    }

    addTask(task, {
      onSuccess: () => {
        toast.success("Tarefa adicionada com sucesso!")
        handleClose()
        reset()
      },
      onError: () => {
        toast.error("Erro ao adicionar tarefa")
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
              disabled={isCreating}
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
              disabled={isCreating}
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
              disabled={isCreating}
            />

            <div className="flex gap-3">
              <Button
                color="secondary"
                size="large"
                className="w-full"
                type="button"
                onClick={handleClose}
                disabled={isCreating}
              >
                Cancelar
              </Button>

              <Button
                size="large"
                className="w-full"
                type="submit"
                disabled={isCreating}
              >
                {isCreating ? (
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
}

export default AddTaskDialog
