import instance from "../utils/axios.utils";

const luckyWinner = {

  Branch: (params) => {
    let promise = new Promise((resolve, reject) => {
      let url = "api/Login/custBranch";
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


  LuckyWinner: (params) => {
        let promise = new Promise((resolve, reject) => {
          let url = "api/LOGIN/LUCKYDRAW";
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

export default luckyWinner;
