import { SendVerificationRequestParams } from "next-auth/providers"
import { Resend } from "resend"

export const sendVerificationRequest = async (params: SendVerificationRequestParams) => {
    const { identifier, url, provider, theme } = params
    const { host } = new URL(url)
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
        await resend.emails.send({
            from: 'no-reply@playlist.deepdivenewsletter.com',
            to: identifier,
            subject: 'Confirm your email',
            text: text({url, host}),
        })
    } catch (error) {
        console.error(error)
    }
}

function text({url, host}) {
    return `Sign in to ${host} by clicking the link below:\n\n${url}\n\n`
}