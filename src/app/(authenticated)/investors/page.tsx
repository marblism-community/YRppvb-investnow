'use client'

import { useState } from 'react'
import { Typography, Input, Button, Table, Space, Modal, Form } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function InvestorsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: investors, isLoading } = Api.investor.findMany.useQuery({
    include: { user: true, documents: true, investments: true },
  })

  const createInvestorMutation = Api.investor.create.useMutation()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleAddInvestor = async (values: any) => {
    try {
      await createInvestorMutation.mutateAsync({ data: values })
      enqueueSnackbar('Investor added successfully', { variant: 'success' })
      form.resetFields()
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to add investor', { variant: 'error' })
    }
  }

  const filteredInvestors = investors?.filter(investor =>
    investor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Info',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Investor Management</Title>
      <Paragraph>
        As a venture capitalist, you can view, add, and manage your investor
        relationships.
      </Paragraph>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          placeholder="Search investors"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Investor
        </Button>
        <Table
          columns={columns}
          dataSource={filteredInvestors}
          loading={isLoading}
          rowKey="id"
        />
      </Space>
      <Modal
        title="Add New Investor"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddInvestor}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of the investor!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="contactInfo" label="Contact Info">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Investor
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
