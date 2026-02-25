import axios from "axios";

let accessToken = null;
let isRefreshing = false;
let refreshPromise = null;
let onLogout = null;

export const setLogoutHandler = (callback) => {
  onLogout = callback;
};

export const setAccessToken = (token) => {
  accessToken = token;
};


const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = axiosInstance
          .post("/auth/refresh")
          .then((res) => {
            const newToken = res.data.accessToken;
            setAccessToken(newToken);
            return newToken;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      const newToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }

   if (error.response?.status === 401) {
  if (onLogout) {
    onLogout();
  }
}

return Promise.reject(error);if (error.response?.status === 401) {
  if (onLogout) {
    onLogout();
  }
}

return Promise.reject(error);if (error.response?.status === 401) {
  if (onLogout) {
    onLogout();
  }
}

return Promise.reject(error);
  }
);

export default axiosInstance;