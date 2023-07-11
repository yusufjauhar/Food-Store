import axios from "axios";

export const getKecamatan = async (id) => {
  try {
    let { data } = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`);
    const dataKecamatan = data.kecamatan.map((res) => {
      return { value: res.id, label: res.nama };
    });
    return dataKecamatan;
  } catch (err) {
    return err.response.data.message;
  }
};
