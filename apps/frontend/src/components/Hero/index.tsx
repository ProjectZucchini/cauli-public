import { createStyles, Group, Overlay, Container, Title, rem } from "@mantine/core";
import { SlackButton } from "../SlackButton";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: "url(./cauli_hero_3.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: rem(700),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: `calc(${theme.spacing.xl} * 8)`,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 4.5)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },
  },

  description: {
    color: theme.white,
    fontWeight: 500,
    paddingBottom: rem(10),
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export function Hero() {
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 1500%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Group>
          <Title className={classes.title}>Cauli for Slack</Title>
        </Group>
        <Title order={3} className={classes.description}>
          Elevate your Slack game with AI generated images. Create art from OpenAI DALL-E 2 directly
          in your Slack channels.
        </Title>

        <SlackButton />
      </Container>
    </div>
  );
}
