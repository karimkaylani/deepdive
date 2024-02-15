import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { AuthOptions } from "next-auth"
import { Provider } from "next-auth/providers"
import { sendVerificationRequest } from "../../../utils/sendVerificationRequest"

export const prisma = new PrismaClient()

//@ts-ignore
const emailProvider: Provider = {
    id: 'resend',
    type: 'email',
    sendVerificationRequest
}

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        emailProvider
    ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }