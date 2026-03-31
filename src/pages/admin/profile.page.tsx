import FormProfile from "@/components/profile/form-profile"
import { useUser } from "reactfire"
import { User, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ProfilePage = () => {

  const {data: user} = useUser()
  if(!user){
    return <div className="text-red-500">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Perfil</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Detalles de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nombre</p>
                <p className="text-sm text-muted-foreground">{user.displayName || "No especificado"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Fecha de creación</p>
                <p className="text-sm text-muted-foreground">{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Desconocida"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editar Perfil</CardTitle>
            <CardDescription>Actualiza tu información</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProfile user={user}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
