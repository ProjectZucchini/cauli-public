import { Center, Stack } from "@mantine/core";
import { Helmet } from "react-helmet-async";
import { Hero } from "../../components/Hero";
import { SlackButton } from "../../components/SlackButton";
import { FeaturesCards } from "../../components/Features";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Cauli for Slack</title>
        <link rel="canonical" href="https://cauli.projectzucchini.com" />
      </Helmet>
      <Stack>
        <Hero />
        <FeaturesCards />
        <Center>
          <SlackButton />
        </Center>
      </Stack>
    </>
  );
}
