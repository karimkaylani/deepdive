'use client'
import { Stack, Title, TextInput, Text, Button } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { secondaryColor } from "../globals";
import { isBeehiivPremium } from "../utils/beehiiv";

function isValidEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export default function SignInInput() {
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignInClick = async () => {
        setLoading(true)
        if (!isValidEmail(email) || !await isBeehiivPremium(email)) {
            setError('Invalid Email')
            setLoading(false)
            return
        }
        setError('')
        signIn('resend', {email: email, callbackUrl: '/'})
        setLoading(false)
    }
    return (
        <Stack align='center' className='mt-14' gap='lg'>
            <Title order={2}>Sign in</Title>
            <Text style={{maxWidth: '500px'}} ta='center'>Sign in with your email to gain access to the playlist. You must have use the same email that has a Premium tier subscription to The Deep Dive newsletter</Text>
            <TextInput type='email' error={error} value={email} onChange={(event) => setEmail(event.target.value)} 
                style={{maxWidth: '500px'}} w={{base: '65%', sm: '50%', md: '35%', lg: '%20'}} 
                label="Your email" leftSection={<IconAt />} />
            <Button size='lg' radius='lg' variant="filled" style={{backgroundColor: secondaryColor}}
                onClick={handleSignInClick}>
                Sign In
            </Button>
            {loading && <Text>Loading...</Text>}
        </Stack>
    )
}