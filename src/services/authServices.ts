/* eslint-disable @typescript-eslint/no-explicit-any */
import { decodedToken } from "@/utils/jwt";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getFromLocalStorage, removeFormLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constant";


export const storeUserInfo = (accessToken: string) => {
  return setToLocalStorage(authKey, accessToken);
};

/**
 * Get user info from access token (stored in cookies)
 */
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (!authToken) {
    console.error("No token found");
    return null;
  }

  try {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
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

/**
 * Refresh token to get new access token
 */
export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    withCredentials: true,
  });
};
