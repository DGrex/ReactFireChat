import FormTask from "@/components/tasks/form-task"
import ListTask from "@/components/tasks/list-task"
import { Suspense } from "react"

const TaskPage = () => {
  return (
    <div>
      <h1 className="text-2x1 font-bold">Task</h1>
      <FormTask/>
      <Suspense fallback={<div>Loading Tasks..</div>}>
        <ListTask/>
      </Suspense>
    </div>
  )
}

export default TaskPage
