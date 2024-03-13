import instance from "../utils/axios.utils";

const payDue = {

  CdBranch: (params) => {
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
  
  PayDue: (params) => {
        let promise = new Promise((resolve, reject) => {
          let url = "api/login/custviewLive/";
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



  ClosedDue: (params) => {
        let promise = new Promise((resolve, reject) => {
          let url = "api/login/closedDue";
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

export default payDue;
