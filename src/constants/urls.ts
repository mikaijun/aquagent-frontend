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
    report: '/report',
    reportWithDate: (date: string) => `/report?date=${date}`,
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
    watersRange: (start: string, end: string) =>
      `${baseurl}/v1/waters?start=${start}&end=${end}`,
    watersFilterMonth: (month: string) => `${baseurl}/v1/waters?month=${month}`,
    water: (id: number) => `${baseurl}/v1/waters/${id}`,
    logout: `${baseurl}/logout`,
  },
}
