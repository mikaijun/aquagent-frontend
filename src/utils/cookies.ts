import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

type CookiesFromHeadersType = {
  jwt: string;
  userId: string;
};

export const JWT = "jwt";
export const USER_ID = "userId";

export const parseCookiesFromHeaders = (
  headers: Headers,
): CookiesFromHeadersType => {
  const getSetCookie = headers.getSetCookie();
  const cookieList = getSetCookie.map((x) => x.split(";")[0]);
  const jwt = cookieList.find((x) => x.includes(JWT))?.split("=")[1] ?? "";
  const userId =
    cookieList.find((x) => x.includes(USER_ID))?.split("=")[1] ?? "";
  return { jwt, userId };
};

export const formatCookiesForHeader = (
  cookiesStore: ReadonlyRequestCookies,
) => {
  const jwt = cookiesStore.get(JWT)?.value;
  const userId = cookiesStore.get(USER_ID)?.value;
  if (!jwt || !userId) return "";

  return `${JWT}=${jwt}; ${USER_ID}=${userId}`;
};

export const parseCookiesFromCookies = (
  cookies: RequestCookie[],
): CookiesFromHeadersType => {
  const jwt = cookies.find((x) => x.name === JWT)?.value ?? "";
  const userId = cookies.find((x) => x.name === USER_ID)?.value ?? "";
  return { jwt, userId };
};
