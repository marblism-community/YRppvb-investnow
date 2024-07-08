'use client'

import { ConfigProvider } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MrbHtml, MrbMain } from './core'
import { Snackbar } from './providers/snackbar'
import './style/main.scss'
import { Theme } from './theme/theme'

export type DesignSystemContext = {
  isMobile: boolean
}

const DesignSystemContext = createContext<DesignSystemContext>({
  isMobile: false,
})

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

const ProviderGeneral = ({ children }) => {
  const [isMobile, setMobile] = useState(false)

  const isWindow = typeof window !== 'undefined'

  const theme = Theme as any

  useEffect(() => {
    if (!isWindow) {
      return
    }

    setMobile(window.innerWidth < 992)

    const handleResize = () => {
      setMobile(window.innerWidth < 992)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (!isWindow) {
        return
      }

      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ConfigProvider theme={theme}>
      <DesignSystemContext.Provider value={{ isMobile }}>
        {children}
      </DesignSystemContext.Provider>
    </ConfigProvider>
  )
}

type Props = {
  children: ReactNode
}

export const DesignSystemProvider: React.FC<Props> = ({ children }) => {
  return (
    <ProviderGeneral>
      <MrbHtml>
        <Snackbar.Provider>
          <MrbMain>{children}</MrbMain>
        </Snackbar.Provider>
      </MrbHtml>
    </ProviderGeneral>
  )
}
