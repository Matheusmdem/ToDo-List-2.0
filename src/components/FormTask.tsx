import * as zod from 'zod'
import styles from './FormTask.module.css'
import { PlusCircle } from "phosphor-react";
import { useContext } from "react";
import { TasksContext } from "../context/TaskContext";
import { CounterTask } from "./CounterTask";
import { DoneTask } from "./DoneTasks";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


const newTaskSchema = zod.object({
  text: zod.string().min(1, 'Informe a tarefa')
})

type NewTaskFormData = zod.infer<typeof newTaskSchema>

export function FormTask() {
  const { createNewTask } = useContext(TasksContext)

  const newTaskForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      text: ''
    }
  })

  const { handleSubmit, register, reset } = newTaskForm

  function handleCreateNewTask(data: NewTaskFormData) {
    createNewTask(data)
    reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleCreateNewTask)}>
      <div>
        <input
          type="text"
          id='text'
          className={styles.textarea}
          placeholder='Adicione uma nova tarefa'
          {...register('text')}
        />
        <button
          className={styles.button}
          type="submit"
        >
          Criar
          <PlusCircle size={20} />
        </button>
      </div>
      <CounterTask />
      <DoneTask />
    </form>
  )
}

