import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface SignInEmailProps {
  signInUrl: string;
}

export const SignInEmail = ({signInUrl}: SignInEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Sign In</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#174086",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src={"https://playlist.deepdivenewsletter.com/logo.png"}
            width="90"
            height="75"
            alt=""
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-10">
              Sign in to The Deep Dive Playlist 
            </Heading>

            <Section>
              <Row>
                <Text className="text-base text-center">
                  Press the button below to gain access to the playlist.
                </Text>

              </Row>
            </Section>

            <Section className="text-center">
              <Button href={signInUrl} className="bg-brand text-white rounded-lg py-3 px-[18px]">
                Press here to sign in
              </Button>
            </Section>

          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SignInEmail;
