import { Badge, Skeleton, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../app/api/addresses";

const Payment = ({ subtotal, idAddress, active }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const [dataAddress, setDataAddress] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataAddresses();
  }, []);

  const getDataAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await getAddresses(user.token);
      const isFind = await data.find((obj) => obj._id === idAddress);
      setDataAddress(isFind);

      const hitungTotal = subtotal;

      setTotal(hitungTotal);
      dispatch({
        type: "ADD_ORDER",
        payload: { idAddress: isFind._id, subtotal, total: hitungTotal },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return err.response.data.message;
    }
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <Skeleton visible={loading}>
      <div className="confirm_wrapper " variant="gradient" bg="#ffff">
        <div className="confirm_wrap">
          <Text className="confirm_text">Alamat Penerima</Text>
          <Text className="confirm_text">{`${dataAddress.detail}, ${dataAddress.kota}, ${dataAddress.provinsi}`}.</Text>
        </div>
        <div className="confirm_wrap">
          <Text className="confirm_text">Alamat Pengirim</Text>
          <Text className="confirm_text">Jl.serayu No.07, RT.07/RW.01, Papringan, Kec. Banyumas, Kab. Banyumas, Jawa tengah 53192</Text>
        </div>
        <div className="confirm_wrap">
          <Text className="confirm_text">Subtotal</Text>
          <Text className="confirm_text">{formatter.format(subtotal)}</Text>
        </div>
        <div className="confirm_wrap">
          <Text className="confirm_text">Total</Text>
          <Text className="confirm_text">
            <Badge style={{ width: "100px" }} variant="gradient" bg="grey" size="lg">
              {formatter.format(total)}
            </Badge>
          </Text>
        </div>
      </div>
    </Skeleton>
  );
};

export default Payment;
