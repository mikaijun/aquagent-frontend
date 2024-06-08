const baseurl = process.env.NEXT_PUBLIC_API_ENDPOINT

export const PagePath = {
  auth: {
    login: '/login',
    loginWhenSignup: '/login?signup=true',
    signup: '/signup',
  },
  loggedIn: {
    home: '/',
    list: '/list',
    listWithDate: (date: string) => `/list?date=${date}`,
  },
}

export const endPoint = {
  auth: {
    login: `${baseurl}/login`,
    signup: `${baseurl}/signup`,
  },
  loggedIn: {
    users: `${baseurl}/v1/users`,
    waters: `${baseurl}/v1/waters`,
    watersFilterDate: (date: string) => `${baseurl}/v1/waters?date=${date}`,
    watersFilterPastWeek: `${baseurl}/v1/waters?pastWeek=true`,
    watersFilterMonth: (month: string) => `${baseurl}/v1/waters?month=${month}`,
    water: (id: number) => `${baseurl}/v1/waters/${id}`,
    logout: `${baseurl}/logout`,
  },
}
