import { useAuthActions } from "../../hooks/use-auth-actions"

const LoginPage = () => {

  const {loginWithGoogle} = useAuthActions()

  return (
    <div>
      <h1>Loadign</h1>
      <button onClick={loginWithGoogle}>Iniciar Con Google</button>  
    </div>
  )
}

export default LoginPage
