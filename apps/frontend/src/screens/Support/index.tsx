import { Center, Container, Paper, Stack, Text, Title, createStyles, rem } from "@mantine/core";
import { Helmet } from "react-helmet-async";

const useStyles = createStyles((theme) => ({
  separator: {
    backgroundColor: theme.fn.primaryColor(),
    width: rem(80),
    height: rem(2),
  },
}));

export function Support() {
  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>Cauli - Support</title>
        <link rel="canonical" href="https://cauli.projectzucchini.com/support" />
      </Helmet>
      <Container size="lg">
        <Paper radius="lg" p="sm">
          <Stack>
            <Title align="center">Support</Title>
            <Center>
              <div className={classes.separator} />
            </Center>
            <Text size="lg">
              If you need to reach us for any reason, you can email:{" "}
              <a href="mailto:support@projectzucchini.com" target="_blank" rel="noreferrer">
                support@projectzucchini.com
              </a>
            </Text>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
