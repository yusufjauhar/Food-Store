import { Badge, Button, Container, Paper, Skeleton, Text, ThemeIcon } from "@mantine/core";
import { IconFileDollar } from "@tabler/icons";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvoice } from "../../app/api/getInvoice";
import { invoiceStyles } from "../../styles/invoiceStyles";
import HeaderLayout from "../header";

const Invoices = () => {
  const dispatch = useDispatch();
  const { order, user } = useSelector((item) => item);
  const { orders } = order;
  const { classes } = invoiceStyles();
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataInvoice();
  }, [orders]);

  const getDataInvoice = async () => {
    try {
      setLoading(true);
      const invoiceData = await getInvoice(orders?._id, user?.token);
      setInvoice(invoiceData);
      Cookies.set("cart", []);
      dispatch({ type: "REMOVE_CART" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <>
      <HeaderLayout />
      <Container mt="10rem">
        <Skeleton visible={loading}>
          <Paper radius="md" withBorder className={classes.card} mt={60 / 3}>
            <ThemeIcon className={classes.icon} size={60} radius={60}>
              <IconFileDollar size={34} stroke={1.5} />
            </ThemeIcon>

            <Text align="center" weight={700} className={classes.title}>
              INVOICE
            </Text>
            <Text color="dimmed" align="center" size="sm">
              Order ID: #{invoice?.order?.order_number}
            </Text>

            <div className={classes.invoices_wrapper}>
              <div className={classes.status}>
                <Badge variant="solid" bg="#a41e1f">
                  {invoice?.payment_status}
                </Badge>
              </div>
              <div className={classes.addresses_wrap}>
                <Paper withBorder className={classes.addresses}>
                  <div className={classes.addresses_text1}>
                    <Badge>FROM: YUSUF J</Badge>
                  </div>
                  <div className={classes.addresses_text2}>
                    <Text>Jl.serayu No.07, RT.07/RW.01, Papringan, Kec. Banyumas, Kab. Banyumas, Jawa tengah 53192</Text>
                  </div>
                </Paper>
                <Paper withBorder className={classes.addresses}>
                  <div className={classes.addresses_text1}>
                    <Badge>TO: {invoice?.delivery_address?.nama}</Badge>
                  </div>
                  <div className={classes.addresses_text2}>
                    <Text>
                      {`${invoice?.delivery_address?.detail}, 
                ${invoice?.delivery_address?.kota}, ${invoice?.delivery_address?.provinsi}`}
                    </Text>
                  </div>
                </Paper>
              </div>
              <div className={classes.bill_wrap}>
                <div className={classes.bill}>
                  <div className={classes.bill1}>
                    <Badge>Total Pembayaran</Badge>
                  </div>
                  <div className={classes.bill2}>
                    <Text fz="xl" fw={700} align="center">
                      {formatter.format(invoice?.total)}
                    </Text>
                  </div>
                </div>
                <div className={classes.bill}>
                  <div className={classes.bill1}>
                    <Badge>Transfer</Badge>
                  </div>
                  <div className={classes.bill2}>
                    <Text>
                      yusuf jauhar <br /> yusufjojo244@gmail.com <br />
                      Dana 087831562908
                    </Text>
                  </div>
                </div>
              </div>
              <div className={classes.btn_invoice}>
                <Link to="/profile">
                  <Button variant="gradient" bg="#a41e1f">
                    KEMBALI KE PROFILE
                  </Button>
                </Link>
              </div>
            </div>
          </Paper>
        </Skeleton>
      </Container>
    </>
  );
};

export default Invoices;
