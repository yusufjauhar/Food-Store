import { Button, Card, Group, Loader, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useScrollIntoView } from "@mantine/hooks";
import { IconShoppingCartPlus } from "@tabler/icons";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postStyles } from "../../styles/postStyles";
import { FaTags } from "react-icons/fa";

const Post = ({ page, setPages, selectedTags, text }) => {
  const [totalPages, setTotalPages] = useState(1);
  const items = useSelector((item) => item);
  const { cart, category, user } = items;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { classes } = postStyles();
  const [isLoading, setIsLoading] = useState(true);
  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: -3333 });

  useEffect(() => {
    getAllProduct();
    scrollIntoView({ alignment: "end" });
  }, [page, selectedTags, category, text]);

  const getAllProduct = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products?q=${text}&page=${page}&tag=${selectedTags}&category=${category}`);
      const { data: products, pages: totalPages } = data;
      setPages(totalPages);
      setTotalPages(totalPages);
      setData(products);
      // console.log(data);
      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const addCartHandler = (item) => {
    const findCart = cart.find((obj) => {
      return obj._id === item._id;
    });

    if (findCart) {
      showNotification({
        message: "Produk ini sudah ditambahkan! ",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],

            "&::before": { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
    } else {
      if (!user || user === null) {
        showNotification({
          message: "Silahkan login terlebih dahulu.. ",
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[6],
              borderColor: theme.colors.red[6],

              "&::before": { backgroundColor: theme.white },
            },

            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              "&:hover": { backgroundColor: theme.colors.red[7] },
            },
          }),
        });
      } else {
        Cookies.set("cart", JSON.stringify([...cart, { ...item, qty: 1 }]));
        dispatch({ type: "ADD_CART", payload: { ...item, qty: 1 } });
      }
    }
  };

  return (
    <>
      {isLoading && (
        <div style={{ position: "fixed" }}>
          <Loader size="xl" variant="dots" />
        </div>
      )}

      {data &&
        data.map((item) => (
          <div key={item._id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "230px", height: "200px", padding: "10px", boxShadow: "0 1px  1px rgba(0, 0, 4, 1)" }}>
              <img style={{ width: "100%", height: "100%" }} src={process.env.REACT_APP_BACKEND_URL + `/public/images/products/${item.image_url}`} alt={item.name} />
            </div>
            <h2>{item.name}</h2>
            {/* <p>{item.description}</p> */}
            <h4>{item.category?.name}</h4>
            <p>
              <FaTags /> {item.tags?.name}
            </p>
            {/* <h4>Rp.{item.price}</h4> */}
            <Card.Section className={classes.footer}>
              <Group position="apart">
                <Text size="md" color="dimmed">
                  {formatter.format(item.price)}
                </Text>
                <Group spacing={0}>
                  <Button leftIcon={<IconShoppingCartPlus />} style={{ backgroundColor: "#1f9ca4" }} size="xs" onClick={() => addCartHandler(item)}>
                    Masukan Keranjang
                  </Button>
                </Group>
              </Group>
            </Card.Section>
          </div>
        ))}
    </>
  );
};

export default Post;
