import { LoaderIcon } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

import { currentTimeDate, formatDate } from '@/utils/format'

import { Card } from '@/components/ui/card'

import ServerWaterListPage from '@/app/(page)/(loggedIn)/list/_components/ServerWaterListPage'

export const metadata: Metadata = {
  title: '一覧',
}

const ListPage = ({ searchParams }: { searchParams?: { date: string } }) => {
  const date = searchParams?.date ?? formatDate(currentTimeDate)

  return (
    <Suspense
      fallback={
        <div className='p-4'>
          <Card className='max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 shadow-2xl h-96 flex items-center justify-center'>
            <LoaderIcon className='animate-spin' />
          </Card>
        </div>
      }
    >
      <ServerWaterListPage date={date} />
    </Suspense>
  )
}

export default ListPage
