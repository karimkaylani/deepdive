import { Stack, Title, Text } from "@mantine/core";

export default function Page() {
    return (
        <Stack align='center' className='mt-14' gap='lg'>
            <Title order={2}>Sign in</Title>
            <Text>An email with a sign in link has been sent to your account. Please check your inbox.</Text>
        </Stack>
    )
}