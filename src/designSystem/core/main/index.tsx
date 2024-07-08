import { Layout } from 'antd'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { Snackbar } from '../../providers'
import { MrbSplashScreen } from '../splashScreen'

interface Props {
  children: React.ReactNode
}

export const MrbMain: React.FC<Props> = ({ children }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (isLoading) {
      setLoading(false)
    }
  }, [])

  const snackbar = useSnackbar()

  Snackbar.Instance.setup(snackbar)

  return (
    <Layout className="mrb-main">
      {isLoading ? <MrbSplashScreen /> : children}
    </Layout>
  )
}
