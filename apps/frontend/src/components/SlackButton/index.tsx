import { Button, Stack, createStyles, rem } from "@mantine/core";
import { useCallback } from "react";
import { SlackIcon } from "../icons/SlackIcon";

const useStyles = createStyles((theme) => ({
  link: {
    alignItems: "center",
    color: theme.black,
    backgroundColor: theme.white,
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: "4px",
    display: "inline-flex",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(18),
    fontWeight: 600,
    justifyContent: "center",
    textDecoration: "none",
    paddingTop: rem(10),
    paddingBottom: rem(10),
    paddingLeft: rem(16),
    paddingRight: rem(16),
  },

  iconWrapper: {
    alignItems: "center",
    display: "inline-flex",
    marginRight: rem(16),
  },
}));

export function SlackButton() {
  const { classes } = useStyles();

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    window.location = import.meta.env.VITE_SLACK_INSTALL_URL;
  }, []);

  return (
    <Stack
      spacing="xs"
      style={{ gap: "0.2rem", paddingTop: rem(24), paddingBottom: rem(24) }}
      align="center"
    >
      <Button size="xl" onClick={handleClick}>
        <div className={classes.iconWrapper}>
          <SlackIcon height={"24px"} width={"24px"} />
        </div>
        Add to Slack
      </Button>
    </Stack>
  );
}
