import { ActionIcon, Avatar, Center, Group, Paper, Text } from "@mantine/core";

import React from "react";
import { useSelector } from "react-redux";

const DetailsProfile = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <Paper
      radius="none"
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        height: "32vh",
        margin: "4rem 0.8rem 0 0",
        width: "100vw",
      })}
    >
      <Avatar radius={120} mx="auto" size="xl" />
      <Text align="center" size="lg" weight={500} mt="md">
        {user?.user?.full_name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {user?.user?.email}
      </Text>
    </Paper>
  );
};

export default DetailsProfile;
