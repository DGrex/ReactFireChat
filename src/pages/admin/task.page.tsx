import FormTask from "@/components/tasks/form-task"
import ListTask from "@/components/tasks/list-task"
import { Suspense } from "react"
import { CheckSquare, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const TaskPage = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto space-y-6 p-4 overflow-auto">
      <div className="flex items-center gap-3">
        <CheckSquare className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Tareas</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Agregar Nueva Tarea
            </CardTitle>
            <CardDescription>Crea una nueva tarea para organizar tu trabajo</CardDescription>
          </CardHeader>
          <CardContent>
            <FormTask/>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              Lista de Tareas
            </CardTitle>
            <CardDescription>Tus tareas pendientes y completadas</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[60vh] overflow-y-auto">
            <Suspense fallback={<div className="text-center py-4">Cargando tareas...</div>}>
              <ListTask/>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TaskPage
