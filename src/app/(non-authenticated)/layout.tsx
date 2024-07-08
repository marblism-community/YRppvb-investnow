import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function LoginLayout({ children }: Props) {
  return <>{children}</>
}
