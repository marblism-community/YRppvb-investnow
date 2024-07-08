'use client'

import { useUserContext } from '@/core/context'
import { MrbSplashScreen } from '@/designSystem'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type Props = { children: ReactNode }

export default function AuthenticatedLayout({ children }: Props) {
  const { isLoggedIn, isLoading } = useUserContext()

  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoading, isLoggedIn])

  if (isLoading) {
    return <MrbSplashScreen />
  }

  if (isLoggedIn) {
    return <NavigationLayout>{children}</NavigationLayout>
  }
}
