import styles from './CounterTask.module.css'
import tasksEmpty from '../assets/Clipboard.svg'
import { useContext, useEffect, useState } from 'react'
import { TasksContext } from '../context/TaskContext'

export function CounterTask() {
  const { tasks = [], } = useContext(TasksContext)
  const [totalDone, setTotalDone] = useState(() => {
    const dones = tasks.reduce((total, valor) => {
      if (valor.done) {
        return total + 1
      } else {
        return total
      }
    }, 0)

    return dones
  })

  useEffect(() => {
    const dones = tasks.reduce((total, valor) => {
      if (valor.done) {
        return total + 1
      } else {
        return total
      }
    }, 0)

    setTotalDone(dones)
  }, [tasks])

  const isTasksEmpty = !tasks.length

  return (
    <>
      <div className={styles.container}>
        <strong className={styles.created}>
          Tarefas criadas
          <span className={styles.counter}>
            {tasks.length}
          </span>
        </strong>
        <strong className={styles.done}>
          Concluidas
          <span className={styles.counter}>
            <span>
              {totalDone}
            </span>
            <span>
              de
            </span>
            <span>
              {tasks.length}
            </span>
          </span>
        </strong>
      </div>
      {isTasksEmpty && (
        <div className={styles.tasksEmpty}>
          <img src={tasksEmpty} alt="Icone Tarefa Vazia" />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      )}
    </>
  )
}