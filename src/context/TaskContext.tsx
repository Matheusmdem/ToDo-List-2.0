import { createContext, ReactNode, useEffect, useState } from "react";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CreateTaskData {
  text: string;
}

interface TaskContextType {
  tasks: Task[];
  createNewTask: (data: CreateTaskData) => void;
  deleteTask: (id: string) => void;
  changeTask: (changeTask: Task) => void;
}

export const TasksContext = createContext({} as TaskContextType)

export function TaskProvider({ children }: CyclesContextProviderProps) {
  const [tasks, setTasks] = useState(() => {
    const storedStateAsJSON = localStorage.getItem('@todo:cycles-state-2.0.0');

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(tasks)

    localStorage.setItem('@todo:cycles-state-2.0.0', stateJSON)
  }, [tasks])

  function createNewTask(data: CreateTaskData) {
    if (window.event) window.event.preventDefault();
    const id = String(new Date().getTime())

    const newTask: Task = {
      id,
      text: data.text,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id: string) {
    if (window.event) window.event.preventDefault();
    const tasksFiltered = tasks.filter((task: Task) => {
      return task.id !== id
    })

    setTasks(tasksFiltered)
  }

  function changeTask(taskChange: Task) {
    const changing = tasks.map((task: Task) => {
      if (task.id === taskChange.id) {
        return taskChange
      } else {
        return task
      }
    })

    setTasks(changing)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createNewTask,
        deleteTask,
        changeTask
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}