import { Image, Container, Grid, SimpleGrid } from "@mantine/core";

export function Gallery() {
  return (
    <Container my="sm">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
        <Image mx="auto" radius="md" src="./dalle_cat_chess.png" alt="Random image" />
        <Grid gutter="sm">
          <Grid.Col span={6}>
            <Image maw={240} mx="auto" radius="md" src="./dalle_angry_man.png" alt="Random image" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image maw={240} mx="auto" radius="md" src="./dalle_toronto.png" alt="Random image" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              maw={240}
              mx="auto"
              radius="md"
              src="./dalle_this_is_fine.png"
              alt="Random image"
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
