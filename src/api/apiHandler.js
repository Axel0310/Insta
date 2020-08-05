import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getImage(imageId) {
    return service
      .get(`/api/images/${imageId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAllImages() {
    return service
      .get("/api/images")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getProfileImages(userId) {
    return service
      .get(`/api/images/profile/${userId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  uploadImage(formInput) {
    return service
      .post(`/api/images`, formInput)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateImage(imgId, formInput) {
    return service
      .patch(`/api/images/${imgId}`, formInput)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteImage(imgId) {
    return service
      .delete(`/api/images/${imgId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  toggleLike(imgId) {
    return service
      .patch(`/api/images/like/${imgId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUser(userId) {
    return service
      .get(`/api/users/${userId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(inputs) {
    return service
      .patch(`/api/users`, inputs)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateSubs(connectedUserId, profileUserId){
    return service
    .patch("/api/users/follow", {connectedUserId: connectedUserId, profileUserId: profileUserId})
    .then( res => res.data)
    .catch(errorHandler);
  }
};
