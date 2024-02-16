'use client'
import { Stack, Title, TextInput, Text, Button, Anchor } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { isBeehiivPremium } from "../utils/beehiiv";
import { primaryColor } from "../colors";

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
    }
    return (
        <Stack align='center' className='mt-14' gap='lg'>
            <Title order={2}>Sign in</Title>
            <Text style={{maxWidth: '450px'}} ta='center'>{"Sign in with your email tied to The Rabbit Hole, The Deep Dive’s paid subscription tier. If you’re not already subscribed to The Rabbit Hole, you can"} <Anchor target='_blank' href='https://www.deepdivenewsletter.com/upgrade'>upgrade your subscription here!</Anchor></Text>
            <TextInput size='md' type='email' error={error} value={email} onChange={(event) => setEmail(event.target.value)} 
                style={{maxWidth: '450px'}} w={{base: '65%', sm: '50%', md: '35%', lg: '%20'}} 
                placeholder="Your email" />
            <Button size='lg' radius='lg' variant="filled" style={{backgroundColor: primaryColor}}
                onClick={handleSignInClick}>
                Sign In
            </Button>
            {loading && <Text>Loading...</Text>}
        </Stack>
    )
}