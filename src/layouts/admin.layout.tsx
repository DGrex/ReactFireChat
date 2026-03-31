import Navbar from "@/components/navbar"
import { Suspense } from "react"
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"



const AdminLayout = () => {

  const {status, data: signInCheckResult, hasEmitted } = useSigninCheck()



  //Mostrar Loading mientras se verifica el estado
  //de inicio de sesió
  if (status === "loading" || !hasEmitted){
    return <div>Loading...</div>
  }
  
 // Redirigir si el usuario no esta autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return(
      <Navigate
        to= "/auth/login"
        replace
      />
    )
  }

  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthenticatedLayout/>
    </Suspense>
  )
}

export default AdminLayout

const AuthenticatedLayout = () =>{
  useUser({
    suspense: true,
  })

  return (
    <div className="h-screen min-h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );

}
