import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { sendVerificationRequest } from "../../../utils/resend";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


//@ts-ignore
const emailProvider: Provider = {
    id: 'resend',
    type: 'email',
    sendVerificationRequest
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        emailProvider
    ],
    pages: {
        signIn: '/sign-in',
        verifyRequest: '/verify'
    }
}