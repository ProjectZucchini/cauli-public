import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Image,
  Stack,
} from "@mantine/core";
import { SlackButton } from "../SlackButton";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes } = useStyles();

  return (
    <Container py="xl">
      <SimpleGrid cols={1} spacing="xl" mt={50} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        <Card key="how-it-works" shadow="md" radius="md" className={classes.card} padding="xl">
          <Stack>
            <Title order={1} className={classes.title} ta="center" mt="sm">
              How it works
            </Title>
            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              1. Add Cauli to your Slack
            </Text>
            <SlackButton />
            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              2. Add your OpenAI credentials
            </Text>
            <Image width="80%" style={{ paddingTop: rem(16) }} src={"./cauli_config.png"} />
            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              3. Add Cauli to a Slack channel
            </Text>
            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              4. Start generating with DALL-E 2
            </Text>
            <Image width="99%" style={{ paddingTop: rem(16) }} src={"./cauli_slash.png"} />
            <Image style={{ paddingTop: rem(16) }} src={"./cauli_prompt.png"} />
            <Image style={{ paddingTop: rem(16) }} src={"./cauli_result.webp"} />
          </Stack>
        </Card>
        <Card key="faq" shadow="md" radius="md" className={classes.card} padding="xl">
          <Stack>
            <Title order={1} className={classes.title} ta="center" mt="sm">
              FAQ
            </Title>
            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              What is Cauli?
            </Text>
            <Text>
              It&apos;s a simple bot for Slack that brings you the power of OpenAI&apos;s DALL-E 2
              to your Slack.
            </Text>

            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              Do I need an OpenAI account?
            </Text>
            <Text>
              Yes, at the moment Cauli requires you to BYOK (Bring Your Own Key), which requires
              that you have an account with OpenAI.
            </Text>

            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              Where do I get my OpenAI credentials?
            </Text>
            <Text>
              You&apos;ll find your organization ID{" "}
              <a href="https://platform.openai.com/account/org-settings">here</a> and your API Key{" "}
              <a href="https://platform.openai.com/account/api-keys">here</a>.
            </Text>

            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              Why can&apos;t I just pay you for access?
            </Text>
            <Text>
              We&apos;ve mostly built this for fun! If there&apos;s enough interest in our Cauli,
              we&apos;ll consider adding a paid tier.
            </Text>

            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              How accurate are the generated images?
            </Text>
            <Text>
              Since Cauli relies on DALL-E 2 and AI models, the accuracy of the images generated in
              response to the prompt cannot be guaranteed. That can be even more fun, though!
            </Text>

            <Text fz="lg" fw={800} className={classes.cardTitle} mt="md">
              &quot;Cauli&quot;, it&apos;s a bit on the nose, isn&apos;t it?
            </Text>
            <Text>We&apos;re not sure what you mean.</Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
