const baseurl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const PagePath = {
  home: "/",
  login: "/login",
} as const;

export const endPoint = {
  auth: {
    login: `${baseurl}/login`,
    logout: `${baseurl}/logout`,
  },
  user: {
    fetch: `${baseurl}/v1/users`,
  },
};
