import {
  Center,
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

const useStyles = createStyles((theme) => ({
  separator: {
    backgroundColor: theme.colors["brand"][7],
    width: rem(80),
    height: rem(2),
  },
}));

export function InstallSuccess() {
  const { classes } = useStyles();

  const slackRedirect = useMemo(() => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("slack_redirect="))
      ?.split("=")
      .slice(1)
      .join("=");
  }, []);

  return (
    <>
      <Helmet>
        <title>Cauli - Installation Success</title>
        <link rel="canonical" href="https://cauli.projectzucchini.com/success" />
      </Helmet>
      <Container size="lg">
        <Stack>
          <Paper radius="lg" p="sm">
            <Stack>
              <Group spacing="xs" position="center">
                <span style={{ fontSize: "28px" }}> &#127882; </span>
                <Title>Installation Success!</Title>
                <span style={{ fontSize: "28px" }}> &#127882; </span>
              </Group>
              <Center>
                <div className={classes.separator} />
              </Center>

              <Text size="xl" align="center">
                You&apos;ve completed all the installations and are ready to go. Add the Cauli to
                any channels you like and start generating images!
                {slackRedirect && (
                  <Text span>
                    {" "}
                    (or click{" "}
                    <a href={`https://slack.com/app_redirect?${slackRedirect}`}>
                      here to go directly
                    </a>
                    )
                  </Text>
                )}
              </Text>
            </Stack>
          </Paper>
          <Center>
            <Image
              radius="lg"
              maw="950px"
              src="./app-home.png"
              alt="App home"
              styles={{
                image: {
                  border: "0.0625rem solid transparent",
                  borderColor: "black",
                },
              }}
            />
          </Center>
        </Stack>
      </Container>
    </>
  );
}
