'use client'
import { Button, Modal, Stack, TextInput, Text, Title } from "@mantine/core";
import { secondaryColor } from "../globals";
import { IconAt } from '@tabler/icons-react';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { isBeehiivPremium } from "../utils/beehiiv";



function isValidEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export default function Page() {
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
            <Text ta='center' w={'500px'}>Sign in with your beehiiv email to gain access to the playlist. You must have have a Premium tier subscription to The Deep Dive newsletter</Text>
            <TextInput type='email' error={error} value={email} onChange={(event) => setEmail(event.target.value)} w={{base: '65%', sm: '50%', md: '35%'}} label="Your beehiiv email" leftSection={<IconAt />} />
            <Button size='lg' radius='lg' variant="filled" style={{backgroundColor: secondaryColor}}
                onClick={handleSignInClick}>
                Sign In
            </Button>
            {loading && <Text>Loading...</Text>}
        </Stack>
    )
}