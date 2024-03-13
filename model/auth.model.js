import instance from "../utils/axios.utils";

const user = {
  Login: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "API/CCALOGINLIVE";
      instance()
        .post(url, data)
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
  

  ForgetOtp: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "api/Login/forgetOtp";
      instance()
        .post(url, data)
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


  GetOtp: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "api/Login/otp";
      instance()
        .post(url, data)
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

  ForgetPassword: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "api/LOGIN/FORGETPASSWORD";
      instance()
        .post(url, data)
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

export default user;
