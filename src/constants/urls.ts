const baseurl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const PagePath = {
  auth: {
    login: "/login",
  },
  loggedIn: {
    home: "/",
    water: "/water",
  },
};

export const endPoint = {
  auth: {
    login: `${baseurl}/login`,
  },
  loggedIn: {
    users: `${baseurl}/v1/users`,
    waters: `${baseurl}/v1/waters`,
    water: (id: number) => `${baseurl}/v1/waters/${id}`,
    logout: `${baseurl}/logout`,
  },
};
