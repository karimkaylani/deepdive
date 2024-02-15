import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    const adminEmails = process.env.ADMIN_EMAILS.split(',')
    if (!session || !session.user || !adminEmails.includes(session.user.email)) {
        return NextResponse.json({message: "Not authorized", success: false})
    }
    revalidateTag('videos')
    return NextResponse.json({message: 'Updated video catalog', success: true})
}