import { SendVerificationRequestParams } from "next-auth/providers"
import { Resend } from "resend"
import SignInEmail from "../emails/signin"

export const sendVerificationRequest = async (params: SendVerificationRequestParams) => {
    const { identifier, url, provider, theme } = params
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
        await resend.emails.send({
            from: 'no-reply@playlist.deepdivenewsletter.com',
            to: identifier,
            subject: 'Get Access to The Deep Dive Searchable Playlist',
            text: text({url}),
            react: SignInEmail({signInUrl: url})
        })
    } catch (error) {
        console.error(error)
    }
}

function text({url}) {
    return `Sign in to The Deep Dive Playlist by clicking the link below:\n\n${url}\n\n`
}