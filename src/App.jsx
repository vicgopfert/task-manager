import { Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"

import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"
import TaskDetailsPage from "./pages/task-details"

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
        <Route path="/" element={<Tasks />} />
        <Route path="/task/:taskId" element={<TaskDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
