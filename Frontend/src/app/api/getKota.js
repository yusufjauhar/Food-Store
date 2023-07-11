import axios from "axios";

export const getKota = async (idProvinsi) => {
  try {
    let { data } = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`);
    const dataKota = data.kota_kabupaten.map((res) => {
      return { value: res.id, label: res.nama };
    });
    return dataKota;
  } catch (err) {
    return err.response.data.message;
  }
};
