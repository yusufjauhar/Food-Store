import axios from "axios";

export const getKelurahan = async (idKecamatan) => {
  try {
    const { data } = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`);
    const dataKelurahan = data.kelurahan.map((res) => {
      return { value: res.id, label: res.nama };
    });
    return dataKelurahan;
  } catch (err) {
    return err.response.data.message;
  }
};
