import { FormTask } from './components/FormTask'
import { Header } from './components/Header'
import styles from './App.module.css'
import './global.css'
import { TaskProvider } from './context/TaskContext'

export function App() {

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <TaskProvider>
          <FormTask />
        </TaskProvider>
      </main>
    </>
  )
}


