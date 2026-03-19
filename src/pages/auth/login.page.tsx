import { Button } from "@/components/ui/button"
import { useAuthActions } from "../../hooks/use-auth-actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const LoginPage = () => {

  const {loginWithGoogle} = useAuthActions()
    
    const handleLoginWithGoogle = async () => {
    //toast.error("Login Falled")
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login successful");
    } else {
      console.error("Login failed:", result.error);
      toast.error("Login Falled")
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to you accont using email and password or with Google</CardDescription>
        <CardContent>
          .....
        </CardContent>
        <CardFooter>
          <Button onClick={handleLoginWithGoogle} className="w-full">Login with Google</Button>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}

export default LoginPage
