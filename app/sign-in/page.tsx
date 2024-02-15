import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import SignInInput from "../components/SignInInput"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (session && session.user) {
        redirect('/')
      }
    return (
        <SignInInput/>
    )
}