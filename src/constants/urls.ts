const baseurl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const PagePath = {
  home: "/",
  login: "/login",
} as const;

export const endPoint = {
  auth: {
    login: `${baseurl}/login`,
  },
  loggedIn: {
    users: `${baseurl}/v1/users`,
    waters: `${baseurl}/v1/waters`,
    logout: `${baseurl}/logout`,
  },
};
