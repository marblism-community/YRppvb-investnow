'use client'
import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { User } from '@prisma/client'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)

  const { mutateAsync: registerUser } =
    Api.authentication.register.useMutation()

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      await registerUser(values)

      signIn('credentials', {
        ...values,
        callbackUrl: '/home',
      })
    } catch (error) {
      enqueueSnackbar(`Could not signup: ${error.message}`, {
        variant: 'error',
      })

      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{ width: '340px', paddingBottom: '100px', paddingTop: '100px' }}
        gap="middle"
      >
        <AppHeader description="Welcome!" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
            label="Name"
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router.push('/login')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">Have an account?</Typography.Text>{' '}
            <Typography.Text>Sign in</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  )
}
