/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { authKey } from "@/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setAccessToken = async (token: string, options?: any) => {
  const cookieStore = await cookies(); 
  cookieStore.set(authKey, token);
  if (options?.redirect) {
    redirect(options.redirect);
  }
};

export default setAccessToken;
