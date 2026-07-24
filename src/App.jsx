import { Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"

import Sidebar from "./components/Sidebar"
import TaskDetailsPage from "./pages/TaskDetails"
import TasksPage from "./pages/Tasks"

function App() {
  return (
    <div className="flex">
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: {
            color: "#35383E",
          },
        }}
      />
      <Sidebar />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/task/:taskId" element={<TaskDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
