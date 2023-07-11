// import { Center, Checkbox, Skeleton, Table, Text } from "@mantine/core";
// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getAddresses } from "../../app/api/addresses";
// import { Link } from "react-router-dom";

// const AddressConfirm = ({ setIdAddress, isSetActive }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [dataAddress, setDataAddress] = useState([]);
//   const [value, setValue] = useState("");
//   const [loading, setLoading] = useState(true);

//   const getDataAddresses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await getAddresses(user.token);
//       setDataAddress(data);
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       console.error(err.response.data.message);
//     }
//   }, [user.token]);

//   useEffect(() => {
//     getDataAddresses();
//     isSetActive(true);
//   }, [getDataAddresses, isSetActive]);

//   useEffect(() => {
//     setIdAddress(value);
//   }, [setIdAddress, value]);

//   const handleChange = (e) => {
//     isSetActive(!e.target.checked);
//     setValue(e.target.checked ? e.target.value : "");
//   };

//   const rows = dataAddress.map((data, item) => (
//     <tr key={item}>
//       <td>
//         <Checkbox value={data._id} onChange={handleChange} checked={value === data._id} />
//       </td>
//       <td>{data.nama}</td>
//       <td>{`${data.detail}, ${data.provinsi}, ${data.kabupaten}, ${data.kecamatan}.`}</td>
//     </tr>
//   ));

//   console.log(rows);

//   return (
//     <>
//       <Skeleton visible={loading}>
//         {dataAddress.length > 0 ? (
//           <Table verticalSpacing="xs" style={{ marginTop: "1rem" }} withBorder>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Nama</th>
//                 <th>Detail</th>
//                 <th>Provinsi</th>
//                 <th>Kabupaten</th>
//                 <th>Kecamatan</th>
//               </tr>
//             </thead>
//             <tbody>{rows}</tbody>
//           </Table>
//         ) : (
//           <Center>
//             <Text>
//               Silahkan tambahkan alamat pengiriman anda pada halaman profile,
//               <Link style={{ textDecoration: "none" }} to="/profile">
//                 {" "}
//                 klik disini.
//               </Link>
//             </Text>
//           </Center>
//         )}
//       </Skeleton>
//     </>
//   );
// };

// export default AddressConfirm;

// import { Center, Checkbox, Skeleton, Table, Text } from "@mantine/core";
// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getAddresses } from "../../app/api/addresses";
// import { Link } from "react-router-dom";

// const AddressConfirm = ({ setIdAddress, isSetActive }) => {
//   const { user } = useSelector((state) => ({ ...state }));
//   const [dataAddress, setDataAddress] = useState(null);
//   const [value, setValue] = useState("");
//   const [loading, setLoading] = useState(true);

//   const getDataAddresses = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await getAddresses(user.token);
//       setDataAddress(data);
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       console.error(err.response.data.message);
//     }
//   }, [user.token]);

//   useEffect(() => {
//     getDataAddresses();
//     isSetActive(true);
//   }, [getDataAddresses, isSetActive]);

//   useEffect(() => {
//     setIdAddress(value);
//   }, [setIdAddress, value]);

//   const handleChange = (e) => {
//     isSetActive(!e.target.checked);
//     setValue(e.target.checked ? e.target.value : "");
//   };

//   const rows = dataAddress ? ( // added a condition to check if dataAddress is not null
//     dataAddress.map((data, item) => (
//       <tr key={item}>
//         <td>
//           <Checkbox value={data._id} onChange={handleChange} checked={value === data._id} />
//         </td>
//         <td>{data.nama}</td>
//         <td>{`${data.detail}, ${data.provinsi}, ${data.kota}, ${data.kecamatan}.`}</td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td>Loading...</td>
//     </tr>
//   );

//   return (
//     <>
//       <Skeleton visible={loading}>
//         {dataAddress && dataAddress.length > 0 ? ( // added a condition to check if dataAddress is not null
//           <Table verticalSpacing="xs" style={{ marginTop: "1rem" }} withBorder>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Nama</th>
//                 <th>Detail</th>
//                 <th>Provinsi</th>
//                 <th>Kabupaten</th>
//                 <th>Kecamatan</th>
//               </tr>
//             </thead>
//             <tbody>{rows}</tbody>
//           </Table>
//         ) : (
//           <Center>
//             <Text>
//               Silahkan tambahkan alamat pengiriman anda pada halaman profile,
//               <Link style={{ textDecoration: "none" }} to="/profile">
//                 {" "}
//                 klik disini.
//               </Link>
//             </Text>
//           </Center>
//         )}
//       </Skeleton>
//     </>
//   );
// };

// export default AddressConfirm;

import { Center, Checkbox, Skeleton, Table, Text } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAddresses } from "../../app/api/addresses";
import { Link } from "react-router-dom";

const AddressConfirm = ({ setIdAddress, isSetActive }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [dataAddress, setDataAddress] = useState(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);

  const getDataAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getAddresses(user.token);
      setDataAddress(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.response.data.message);
    }
  }, [user.token]);

  useEffect(() => {
    getDataAddresses();
    isSetActive(true);
  }, [getDataAddresses, isSetActive]);

  useEffect(() => {
    setIdAddress(value);
  }, [setIdAddress, value]);

  const handleChange = (e) => {
    isSetActive(!e.target.checked);
    setValue(e.target.checked ? e.target.value : "");
  };

  const rows = dataAddress ? (
    dataAddress.map((data, item) => (
      <tr key={item}>
        <td>
          <Checkbox value={data._id} onChange={handleChange} checked={value === data._id} style={{ "--control-color": "#000000" }} />
        </td>
        <td>{data.nama}</td>
        <td>{data.detail}</td>
        <td>{data.provinsi}</td>
        <td>{data.kota}</td>
        <td>{data.kecamatan}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td>Loading...</td>
    </tr>
  );

  return (
    <>
      <Skeleton visible={loading}>
        {dataAddress && dataAddress.length > 0 ? (
          <Table verticalSpacing="xs" style={{ marginTop: "1rem" }} withBorder>
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Detail</th>
                <th>Provinsi</th>
                <th>Kabupaten</th>
                <th>Kecamatan</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ) : (
          <Center>
            <Text>
              Silahkan tambahkan alamat pengiriman anda pada halaman profile,
              <Link style={{ textDecoration: "none" }} to="/profile">
                {" "}
                klik disini.
              </Link>
            </Text>
          </Center>
        )}
      </Skeleton>
    </>
  );
};

export default AddressConfirm;
