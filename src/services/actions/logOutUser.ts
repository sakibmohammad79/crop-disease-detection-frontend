import { authKey } from "@/constant";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

export const logOutUser = async (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  await deleteCookies([authKey, "refreshToken", "accessToken"]);
  router.push("/");
  router.refresh();
};
