import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

type CookiesFromHeadersType = {
  jwt: string;
  userId: string;
};

export const parseCookiesFromHeaders = (
  headers: Headers,
): CookiesFromHeadersType => {
  const getSetCookie = headers.getSetCookie();
  const cookieList = getSetCookie.map((x) => x.split(";")[0]);
  const jwt = cookieList.find((x) => x.includes("jwt"))?.split("=")[1] ?? "";
  const userId =
    cookieList.find((x) => x.includes("userId"))?.split("=")[1] ?? "";
  return { jwt, userId };
};

export const formatCookiesForHeader = (
  cookiesStore: ReadonlyRequestCookies,
) => {
  const jwt = cookiesStore.get("jwt")?.value;
  const userId = cookiesStore.get("userId")?.value;
  if (!jwt || !userId) return "";

  return `jwt=${jwt}; userId=${userId}`;
};

export const parseCookiesFromCookies = (
  cookies: RequestCookie[],
): CookiesFromHeadersType => {
  const jwt = cookies.find((x) => x.name === "jwt")?.value ?? "";
  const userId = cookies.find((x) => x.name === "userId")?.value ?? "";
  return { jwt, userId };
};
