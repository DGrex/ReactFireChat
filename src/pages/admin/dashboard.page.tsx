import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire";
import { MessageSquare, Users, CheckSquare, UserCheck, LogOut, User } from "lucide-react";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthActions();

  return (
    <div className="min-h-screen max-w-7xl mx-auto space-y-8 p-4 overflow-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-linear-to-r from-primary/20 via-secondary/20 to-accent/20 p-6 md:p-8 rounded-2xl shadow-xl border border-primary/20">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Bienvenido de vuelta, {user!.displayName || "Usuario"}!</p>
        </div>
        <Button variant="outline" onClick={logout} className="bg-background/50 backdrop-blur-sm">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Mensajes</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">0</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Chats activos</p>
          </CardContent>
        </Card>
        <Card className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Amigos</CardTitle>
            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">0</div>
            <p className="text-xs text-green-600 dark:text-green-400">Contactos agregados</p>
          </CardContent>
        </Card>
        <Card className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Tareas</CardTitle>
            <CheckSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">0</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-transform duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Perfil</CardTitle>
            <UserCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">100%</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">Completado</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <UserCheck className="w-5 h-5" />
            Información del Usuario
          </CardTitle>
          <CardDescription>Detalles de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user!.displayName || "No especificado"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email: {user!.email || "No especificado"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
