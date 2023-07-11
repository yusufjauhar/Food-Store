import { ActionIcon, Blockquote, Button, Flex, Grid, Text, Textarea, TextInput, Tooltip } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { getProvinsi } from "../../app/api/getProvinsi";
import { getKota } from "../../app/api/getKota";
import { getKecamatan } from "../../app/api/getKecamatan";
import { getKelurahan } from "../../app/api/getKelurahan";
import { createAddress, getAddresses } from "../../app/api/addresses";
import SelectAddressLayout from "./SelectAddressLayout";
import { IconAddressBook, IconMapPins, IconSquareX } from "@tabler/icons";
import ListAddress from "./ListAddress";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const Address = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [idKecamatan, setIdKecamatan] = useState("");
  const [idKelurahan, setIdKelurahan] = useState("");
  const [idProv, setIdProv] = useState("");
  const [idKota, setIdKota] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const provRef = useRef(null);
  const kotaRef = useRef(null);
  const kecamatanRef = useRef(null);
  const kelurahanRef = useRef(null);

  useEffect(() => {
    getDataProvinsi();
    getDataKota(idProv);
  }, [idProv]);

  useEffect(() => {
    getDataKota(idProv);
  }, [idProv]);

  useEffect(() => {
    getDatakecamatan(idKota);
  }, [idKota]);

  useEffect(() => {
    getDataKelurahan(idKecamatan);
  }, [idKecamatan]);

  useEffect(() => {
    getDataAddresses();
  }, [loading]);

  const getDataProvinsi = async () => {
    const res = await getProvinsi();
    setProvinsi(res);
  };

  const getDataKota = async (idProv) => {
    if (idProv) {
      const res = await getKota(idProv);
      setKota(res);
    }
  };

  const getDatakecamatan = async (idKota) => {
    if (idKota) {
      const res = await getKecamatan(idKota);
      setKecamatan(res);
    }
  };

  const getDataKelurahan = async (idKecamatan) => {
    if (idKecamatan) {
      const res = await getKelurahan(idKecamatan);
      setKelurahan(res);
    }
  };

  const form1 = useForm({
    initialValues: {
      name: "",
      detailAddress: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
    },
    validate: {
      name: (value) => (value.length < 3 ? "Nama Lengkap minimal 3 Karakter." : null),
      detailAddress: (value) => (value.length < 20 ? "Detail Alamat minimal 20 Karakter." : null),
      provinsi: (value) => (value.length < 1 ? "Pilih setidaknya satu item" : null),
      kota: (value) => (value.length < 1 ? "Pilih setidaknya satu item" : null),
      kecamatan: (value) => (value.length < 1 ? "Pilih setidaknya satu item" : null),
      kelurahan: (value) => (value.length < 1 ? "Pilih setidaknya satu item" : null),
    },
  });

  const getDataAddresses = async () => {
    try {
      const res = await getAddresses(user.token);
      setDataAddress(res);
    } catch (err) {
      return err.response.data.message;
    }
  };

  const handleSubmit = async (val) => {
    try {
      const data = {
        nama: val.name,
        // kota: val.kota,
        kota: kotaRef.current.defaultValue,
        provinsi: provRef.current.defaultValue,
        kecamatan: kecamatanRef.current.defaultValue,
        kelurahan: kelurahanRef.current.defaultValue,
        detail: val.detailAddress,
        code_kota: idKota,
        code_kecamatan: idKecamatan,
        code_kelurahan: idKelurahan,
      };
      console.log(data);
      setLoading(true);
      await createAddress(data, user.token);
      setLoading(false);
      form1.reset();
      setIsVisible(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <Flex gap="md" justify="flex-start" align="flex-start" direction="column" w="100%">
        <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "93%" }}>
          <div style={{ flex: 1 }}>
            <Button leftIcon={<IconAddressBook />} variant="white" mt="5rem" ml="4.5rem" onClick={() => setIsVisible((o) => !o)} style={{ flex: 1 }}>
              Tambah Alamat
            </Button>
          </div>
          {isVisible && (
            <div>
              <Tooltip label="Tutup Form!" withArrow position="left-start=">
                <ActionIcon mt={80} size="xl" style={{ transform: "translate(12px, 45px)" }} onClick={() => setIsVisible(false)} variant="transparent">
                  <IconSquareX size={32} />
                </ActionIcon>
              </Tooltip>
            </div>
          )}
        </div>
        {isVisible && (
          <form onSubmit={form1.onSubmit((val) => handleSubmit(val))} style={{ width: "70vw", marginLeft: "4.5rem" }}>
            <Grid gutter="md" style={{ marginTop: "0.4rem" }}>
              <Grid.Col span={6}>
                <TextInput label="Nama Lengkap" placeholder="Nama Lengkap" {...form1.getInputProps("name")} />
                <Textarea label="Detail Alamat" placeholder="Jl. Nama Jalan No. 000, Detail Gang" {...form1.getInputProps("detailAddress")} minRows={9} />
              </Grid.Col>
              <Grid.Col span={6}>
                <SelectAddressLayout form1={form1} setId={setIdProv} label="Provinsi" placeholder="Pilih Provinsi" data={provinsi} inputProp="provinsi" valForm={form1.values.provinsi} valField="provinsi" selectRef={provRef} />
                <SelectAddressLayout form1={form1} setId={setIdKota} label="Kota/Kabupaten" placeholder="Pilih Kota/Kabupaten" data={kota} inputProp="kota" valForm={form1.values.kota} valField="kota" selectRef={kotaRef} />
                <SelectAddressLayout form1={form1} setId={setIdKecamatan} label="Kecamatan" placeholder="kecamatan" data={kecamatan} inputProp="kecamatan" valForm={form1.values.kecamatan} valField="kecamatan" selectRef={kecamatanRef} />
                <SelectAddressLayout
                  form1={form1}
                  setId={setIdKelurahan}
                  label="Kelurahan"
                  placeholder="Pilih Kelurahan"
                  data={kelurahan}
                  inputProp="kelurahan"
                  valForm={form1.values.kelurahan}
                  valField="kelurahan"
                  selectRef={kelurahanRef}
                />
                {/* <Select label="Kecamatan" placeholder="Pilih Kecamatan" data={kecamatan} value={idKecamatan} onChange={(value) => setIdKecamatan(value)} ref={kecamatanRef} />
                <Select label="Kelurahan" placeholder="Pilih Kelurahan" data={kelurahan} value={idKelurahan} onChange={(value) => setIdKelurahan(value)} ref={kelurahanRef} /> */}

                <Button variant="gradient" type="submit" mt="sm" fullWidth style={({ height: "46px" }, { backgroundColor: "#1f9ca4" })} loading={loading} loaderPosition="center">
                  Simpan
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        )}
        <Blockquote px={0} ml="4.5rem" color="blue" cite="– Alamat" icon={<IconMapPins size={30} />}>
          Alamat Penagihan/Alamat Pengiriman.
        </Blockquote>
        <Grid ml="4.5rem" w="85%">
          {dataAddress && dataAddress.count > 0 ? (
            dataAddress.data.map((data, i) => (
              <Grid.Col span={6} key={i}>
                <ListAddress name={data.nama} detail={data.detail} kota={data.kota} provinsi={data.provinsi} kecamatan={data.kecamatan} kelurahan={data.kelurahan} />
              </Grid.Col>
            ))
          ) : (
            <Text c="dimmed" w="100%" align="center">
              Silahkan Tambahkan Alamat Penagihan/Alamat Pengiriman.
            </Text>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default Address;
