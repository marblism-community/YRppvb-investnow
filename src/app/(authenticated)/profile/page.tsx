'use client'

import { Avatar, Button, Flex, Form, Input, Typography } from 'antd'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const { enqueueSnackbar } = useSnackbar()

  const { user, refetch: refetchUser } = useUserContext()

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)
  const [isLoadingLogout, setLoadingLogout] = useState(false)

  const { mutateAsync: updateUser } = Api.user.update.useMutation()

  useEffect(() => {
    form.setFieldsValue(user)
  }, [user])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      await updateUser({
        where: { id: user.id },
        data: {
          email: values.email,
          name: values.name,
          pictureUrl: values.pictureUrl,
        },
      })

      refetchUser()
    } catch (error) {
      enqueueSnackbar(`Could not save user: ${error.message}`, {
        variant: 'error',
      })
    }

    setLoading(false)
  }

  const handleClickLogout = async () => {
    setLoadingLogout(true)

    try {
      await signOut({ callbackUrl: '/login' })
    } catch (error) {
      enqueueSnackbar(`Could not logout: ${error.message}`, {
        variant: 'error',
      })

      setLoadingLogout(false)
    }
  }

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Typography.Title level={1}>Profile</Typography.Title>
        <Button onClick={handleClickLogout} loading={isLoadingLogout}>
          Logout
        </Button>
      </Flex>

      <Flex justify="center" style={{ marginBottom: '30px' }}>
        <Avatar size={80} src={user.pictureUrl}>
          {Utility.stringToInitials(user.name)}
        </Avatar>
      </Flex>

      <Form
        form={form}
        initialValues={user}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input type="email" placeholder="Your email" autoComplete="email" />
        </Form.Item>

        <Form.Item label="Profile picture" name="pictureUrl">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
