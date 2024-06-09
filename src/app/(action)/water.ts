'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { formatCookiesForHeader } from '@/utils/cookies'

import { endPoint } from '@/constants/urls'

export type WaterResponse = {
  ID: number
  UserID: number
  Volume: number
  DrankAt: string
}

type QueryType = {
  date?: string
  start?: string
  end?: string
  month?: string
}

const generateEndPoint = ({ date, start, end, month }: QueryType) => {
  if (date) {
    return endPoint.loggedIn.watersFilterDate(date)
  } else if (start && end) {
    return endPoint.loggedIn.watersRange(start, end)
  } else if (month) {
    return endPoint.loggedIn.watersFilterMonth(month)
  } else {
    return endPoint.loggedIn.waters
  }
}

export async function saveWater({
  volume,
  drank_at,
}: {
  volume: number
  drank_at: string
}): Promise<WaterResponse> {
  const cookiesStore = cookies()
  const response = await fetch(endPoint.loggedIn.waters, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: formatCookiesForHeader(cookiesStore),
    },
    credentials: 'include',
    body: JSON.stringify({
      volume,
      drank_at,
    }),
  })
  if (response.status === 200) {
    const data = (await response.json()) as WaterResponse
    return data
  } else {
    return {
      ID: 0,
      UserID: 0,
      Volume: 0,
      DrankAt: '',
    }
  }
}

export async function deleteWater({ id }: { id: number }) {
  const cookiesStore = cookies()

  const response = await fetch(endPoint.loggedIn.water(id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: formatCookiesForHeader(cookiesStore),
    },
    credentials: 'include',
  })
  return response.status === 200
}

export async function fetchWaters({
  date,
  start,
  end,
  month,
}: QueryType): Promise<NextResponse<WaterResponse[]>> {
  const cookiesStore = cookies()
  const url = generateEndPoint({ date, start, end, month })
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: formatCookiesForHeader(cookiesStore),
      },
      credentials: 'include',
    })
    const data = (await response.json()) as WaterResponse[]
    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    console.error(e)
    const data: WaterResponse[] = []
    return NextResponse.json(data, { status: 500 })
  }
}
