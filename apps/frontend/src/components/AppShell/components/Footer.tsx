import {
  createStyles,
  Anchor,
  Container,
  Footer as MantineFooter,
  Group,
  Image,
  ThemeIcon,
  Text,
  rem,
} from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const FOOTER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.sm} ${theme.spacing.sm}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export function Footer({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const items = useMemo(
    () =>
      links.map((link) => (
        <Anchor<"a">
          color="dimmed"
          key={link.label}
          href={link.link}
          sx={{ lineHeight: 1 }}
          onClick={(event) => {
            event.preventDefault();
            navigate(link.link);
          }}
          size="sm"
        >
          {link.label}
        </Anchor>
      )),
    [links, navigate]
  );

  return (
    <MantineFooter height={FOOTER_HEIGHT}>
      <Container className={classes.inner} size="xl">
        <Group spacing={"xs"}>
          <ThemeIcon size="md" color="white">
            <Image src={"/cauli_logo_no_bg_small.png"}></Image>
          </ThemeIcon>
          <Text size="lg" weight="800">
            Cauli for Slack
          </Text>
        </Group>

        <Group className={classes.links}>{items}</Group>
      </Container>
    </MantineFooter>
  );
}
