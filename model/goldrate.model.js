import instance from "../utils/axios.utils";

const goldrate = {
  GoldRate: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/login/GoldRate";
      instance()
        .get(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else if (error.message) {
            reject(error.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },

  GoldMaxMinRate: (params) => {
    let promise = new Promise((resolve, reject) => {
      let url = "api/login/MinMaxGoldRate";
      instance()
        .get(url, {
          params: params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response.data.message);
          } else if (error.message) {
            reject(error.message);
          } else {
            reject(error);
          }
        });
    });
    return promise;
  },
};

export default goldrate;
