import axios from "axios";

export const getProvinsi = async () => {
  try {
    const response = await axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi");
    const dataProvinsi = response.data.provinsi.map((provinsi) => {
      return { value: provinsi.id, label: provinsi.nama };
    });
    return dataProvinsi;
  } catch (error) {
    console.log(error);
  }
};
