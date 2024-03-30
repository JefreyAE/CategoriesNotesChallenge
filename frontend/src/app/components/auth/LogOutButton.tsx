import { useRouter } from "next/navigation"


export default  function LogOutButton() {
  const user = localStorage.getItem('user')
  const userObject = user && JSON.parse(user)
  
  const router = useRouter()

  const logOut = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    router.push('/')
  }
  return user && (
    <div className="flex items-center gap-4">
      Welcome, {userObject.email}!
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          onClick={logOut}>
          Logout
        </button>
    </div>
  )
}
