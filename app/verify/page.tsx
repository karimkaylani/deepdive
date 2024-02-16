import { Stack, Title, Text, Anchor } from "@mantine/core";
import Link from "next/link";
import { primaryColor } from "../colors";

export default function Page() {
    return (
        <Stack align='center' className='mt-14' gap='lg'>
            <Title ta='center' order={2}>Sign in</Title>
            <Text ta='center'>{"We’ve sent an email with your sign-in link. Please check your inbox."}</Text>
            <Stack gap='xs'>
                <Text size='xs' ta='center'>It may take a few minutes for the email to be delievered.</Text>
                <Text size='xs' ta='center'>{"Still don't see it?"} <Anchor className='underline' c={primaryColor} href='/sign-in'>Click here to try again.</Anchor></Text>
            </Stack>
        </Stack>
    )
}