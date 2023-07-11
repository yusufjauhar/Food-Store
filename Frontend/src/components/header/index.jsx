import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, HoverCard, Group, Button, UnstyledButton, Text, SimpleGrid, ThemeIcon, Anchor, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, TextInput, Avatar, ActionIcon, Indicator } from "@mantine/core";
import { IconCookie, IconCup, IconChevronDown, IconSearch, IconBrandShopee } from "@tabler/icons";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { headerStyles } from "../../styles/headerStyles";
import RegisterModal from "../../pages/login/RegisterModal";
import LoginModal from "../../pages/login/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../reducers/searchReducer";

const mockdata = [
  {
    icon: IconCookie,
    title: "Food",
    description: "Menu makanan di exsstore.",
  },
  {
    icon: IconCup,
    title: "Drink",
    description: "Menu minuman di exsstore.",
  },
];

const HeaderLayout = ({ setText, setPage }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const { cart } = useSelector((cart) => cart);
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = headerStyles();
  const largeScreen = useMediaQuery("(min-width: 1040px)");

  const categoryHandler = (category) => {
    dispatch({
      type: "ADD_CATEGORY",
      payload: category.toLowerCase(),
    });
    setPage(1);
  };

  const resetHandler = () => {
    dispatch({
      type: "ADD_CATEGORY",
      payload: "",
    });
  };

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title} onClick={() => categoryHandler(item.title)}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const rightSection = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    ></div>
  );

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    dispatch(setSearchText(searchText));
  };

  return (
    <>
      <Box>
        <Header
          height={60}
          px={largeScreen ? 100 : "md"}
          style={{
            position: "fixed",
            top: 0,
            zIndex: 999,
            backgroundColor: "#a41e1f",
          }}
        >
          <Group position="apart" sx={{ height: "100%" }}>
            <Group sx={{ height: "100%" }} spacing={0} className={classes.hiddenMobile}>
              <Link to="/" className={classes.link} color="white">
                Beranda
              </Link>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <Link to="/" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5} color="white">
                        Kategori
                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Group position="apart" px="md">
                    <Text weight={500}>List Kategori</Text>
                    <Anchor href="#" size="xs" onClick={() => resetHandler()}>
                      Reset Category
                    </Anchor>
                  </Group>

                  <Divider my="sm" mx="-md" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
              <TextInput placeholder="Search" icon={<IconSearch size={16} />} rightSectionWidth={90} rightSection={rightSection} styles={{ rightSection: { pointerEvents: "none" } }} ml={8} onChange={(e) => setText(e.target.value)} />
            </Group>

            <Group className={classes.hiddenMobile}>
              {user?.user ? (
                <>
                  {" "}
                  <Link to="/cart">
                    <Indicator label={cart?.length} showZero={false} dot={false} overflowCount={999} inline size={18}>
                      <ActionIcon variant="transparent">
                        <IconBrandShopee size={25} color="white" />
                      </ActionIcon>
                    </Indicator>
                  </Link>
                  <Link to="/profile">
                    <UnstyledButton>
                      <Group>
                        <Avatar size={35} color="white"></Avatar>
                        <div>
                          <Text color="white">{user.user.full_name.split(" ")[0]}</Text>
                          <Text size="xs" color="white">
                            see more details
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  </Link>
                </>
              ) : (
                <>
                  <Button variant="default" onClick={() => setIsLogin(true)}>
                    Log in
                  </Button>
                  <Button onClick={() => setIsRegister(true)}>Sign up</Button>
                </>
              )}
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Group>
        </Header>

        <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="bStore" className={classes.hiddenDesktop} zIndex={99}>
          <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
            <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

            <Link to="/" className={classes.link}>
              Beranda
            </Link>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>

            <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

            <Group position="center" grow pb="xl" px="md">
              <Button variant="default" onClick={() => setIsLogin(true)} color="white">
                Log in
              </Button>
              <Button onClick={() => setIsRegister(true)} color="white">
                Sign up
              </Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
      {isRegister && <RegisterModal isRegister={isRegister} setIsRegister={setIsRegister} />}
      {isLogin && <LoginModal isLogin={isLogin} setIsLogin={setIsLogin} />}
    </>
  );
};

export default HeaderLayout;
