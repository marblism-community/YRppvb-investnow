'use client'

import { useState } from 'react'
import {
  Typography,
  Input,
  Button,
  List,
  Card,
  Row,
  Col,
  Space,
  Spin,
} from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function StartupsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [newStartupName, setNewStartupName] = useState<string>('')

  const {
    data: startups,
    isLoading,
    refetch,
  } = Api.startup.findMany.useQuery({
    where: { userId: user?.id },
    include: { user: true },
  })

  const createStartupMutation = Api.startup.create.useMutation()

  const handleAddStartup = async () => {
    if (!newStartupName) {
      enqueueSnackbar('Startup name is required', { variant: 'error' })
      return
    }
    try {
      await createStartupMutation.mutateAsync({
        data: { name: newStartupName, userId: user?.id },
      })
      enqueueSnackbar('Startup added successfully', { variant: 'success' })
      setNewStartupName('')
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to add startup', { variant: 'error' })
    }
  }

  const filteredStartups = startups?.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Title level={2}>My Portfolio</Title>
          <Paragraph>Manage and track your investments in startups.</Paragraph>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Search
              placeholder="Search startups"
              enterButton={<SearchOutlined />}
              size="large"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Input
              placeholder="New startup name"
              size="large"
              value={newStartupName}
              onChange={e => setNewStartupName(e.target.value)}
              addonAfter={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddStartup}
                >
                  Add
                </Button>
              }
            />
            {isLoading ? (
              <Spin tip="Loading startups..." />
            ) : (
              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={filteredStartups}
                renderItem={startup => (
                  <List.Item>
                    <Card title={startup.name}>
                      <Text>{startup.description}</Text>
                    </Card>
                  </List.Item>
                )}
              />
            )}
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
