/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKey } from "@/constant";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, removeFormLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getuserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);

    return {
      authToken,
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFormLocalStorage(authKey);
};


export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "applicatio/json" },
    withCredentials: true,
  });
};