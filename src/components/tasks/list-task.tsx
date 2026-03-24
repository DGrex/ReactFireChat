import { useTaskAction } from "@/hooks/use-task-actions"
import ItemTask from "./item-task"

const ListTask = () => {
    const {tasks} = useTaskAction()
  return (
    <div className="space-y-4 mt-4">
     {
      tasks.map((dato)=>(
       <ItemTask key={dato.id} task={dato} />
      ))}
    </div>
  )
}

export default ListTask
