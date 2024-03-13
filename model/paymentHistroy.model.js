import instance from "../utils/axios.utils";

const paymentHistory = {
  
  Transactions: (params) => {
        let promise = new Promise((resolve, reject) => {
          let url = "api/login/tran/";
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

export default paymentHistory;
