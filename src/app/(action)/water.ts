'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { formatCookiesForHeader } from '@/utils/cookies'

import { endPoint } from '@/constants/urls'

export type WaterResponse = {
  ID: number
  UserID: number
  Volume: number
  CreatedAt: string
  UpdatedAt: string
}

export async function saveWater({
  id,
  volume,
}: {
  id: number
  volume: number
}): Promise<WaterResponse> {
  const url = id ? endPoint.loggedIn.water(id) : endPoint.loggedIn.waters
  const method = id ? 'PUT' : 'POST'
  const cookiesStore = cookies()
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: formatCookiesForHeader(cookiesStore),
    },
    credentials: 'include',
    body: JSON.stringify({
      volume,
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
      CreatedAt: '',
      UpdatedAt: '',
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

export async function fetchWaters(): Promise<NextResponse<WaterResponse[]>> {
  const cookiesStore = cookies()
  try {
    const response = await fetch(endPoint.loggedIn.waters, {
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
