'use client'

import { Skeleton } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.push('/home')
  }, [])
  return <Skeleton />
}
