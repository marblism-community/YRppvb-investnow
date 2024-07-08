import { useRouter } from 'next/navigation'
import React, { ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

export const Logo: React.FC<Props> = ({
  width = 50,
  height = 50,
  style,
  ...props
}) => {
  const router = useRouter()

  const goTo = (url: string) => {
    router.push(url)
  }

  return (
    <>
      <img
        src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/YRppvb-investnow-5yy2"
        height={width}
        width={height}
        style={{
          borderRadius: '10px',
          cursor: 'pointer',
          ...style,
        }}
        {...props}
        onClick={() => goTo('/home')}
      />
    </>
  )
}
