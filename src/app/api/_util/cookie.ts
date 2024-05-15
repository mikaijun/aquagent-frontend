import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export type GenerateCookiesType = {
  jwt: string;
  userId: string;
};

export const generateCookies = (headers: Headers): GenerateCookiesType => {
  const getSetCookie = headers.getSetCookie();
  const cookieList = getSetCookie.map((x) => x.split(";")[0]);
  const jwt = cookieList.find((x) => x.includes("jwt"))?.split("=")[1] ?? "";
  const userId =
    cookieList.find((x) => x.includes("userId"))?.split("=")[1] ?? "";
  return { jwt, userId };
};

export const generateHeaderCookies = (cookiesStore: ReadonlyRequestCookies) => {
  return `jwt=${cookiesStore.get("jwt")?.value}; userId=${
    cookiesStore.get("userId")?.value
  }`;
};
