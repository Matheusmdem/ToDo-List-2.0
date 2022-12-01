import { FloppyDisk, Pencil, Trash } from "phosphor-react";
import { useContext, useState } from "react";
import { TasksContext } from "../context/TaskContext";
import styles from './DoneTask.module.css'

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface TodoContextType {
  todos: Todo;
  onChange: (todos: Todo) => void;
  onDelete: (id: string) => void;
}

export function DoneTask() {
  const {
    tasks = [],
    deleteTask,
    changeTask
  } = useContext(TasksContext)


  return (
    <ul className={styles.list}>
      {tasks.map(todo => (
        <li key={todo.id}>
          <Task
            todos={todo}
            onChange={changeTask}
            onDelete={deleteTask}
          />
        </li>
      ))}
    </ul>
  )
}

function Task({ onChange, onDelete, todos }: TodoContextType) {
  const [isEditing, setIsEditing] = useState(false)
  let container;

  if (isEditing) {
    container = (
      <>
        <input
          type='text'
          className={styles.input}
          value={todos.text}
          onChange={e => {
            onChange({
              ...todos,
              text: e.target.value
            })
          }}
        />

        <button
          type="button"
          className={styles.save}
          onClick={() => setIsEditing(false)}
        >
          <FloppyDisk size={24} />
        </button>
      </>
    )
  } else {
    container = (
      <>
        <p className={todos.done ? styles.isCompleted : styles.notCompleted}>
          {todos.text}
        </p>
        <button
          type="button"
          className={styles.edit}
          onClick={() => setIsEditing(true)}
        >
          <Pencil size={24} />
        </button>
      </>
    )
  }

  return (
    <div className={styles.box}>
      <input
        type="checkbox"
        name="checkbox"
        className={styles.check}
        checked={todos.done}
        onChange={e => {
          onChange({
            ...todos,
            done: e.target.checked
          })
        }}
      />

      {container}

      <button
        type="button"
        className={styles.trash}
        onClick={() => onDelete(todos.id!)}
      >
        <Trash size={24} />
      </button>
    </div>
  )
}