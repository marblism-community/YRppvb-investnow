'use client'

import { useState } from 'react'
import {
  Typography,
  Button,
  Form,
  Input,
  Space,
  Upload,
  Table,
  Popconfirm,
} from 'antd'
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function StartupDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  const startupId = Array.isArray(params.startupId)
    ? params.startupId[0]
    : params.startupId

  const { data: startup, isLoading } = Api.startup.findUnique.useQuery({
    where: { id: startupId },
    include: { documents: true },
  })

  const updateStartupMutation = Api.startup.update.useMutation()
  const deleteStartupMutation = Api.startup.delete.useMutation()
  const createDocumentMutation = Api.document.create.useMutation()
  const deleteDocumentMutation = Api.document.delete.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  const handleEdit = () => {
    setIsEditing(true)
    form.setFieldsValue({
      name: startup?.name,
      description: startup?.description,
      performanceMetrics: startup?.performanceMetrics,
    })
  }

  const handleSave = async values => {
    try {
      await updateStartupMutation.mutateAsync({
        where: { id: startupId },
        data: values,
      })
      enqueueSnackbar('Startup updated successfully', { variant: 'success' })
      setIsEditing(false)
    } catch (error) {
      enqueueSnackbar('Failed to update startup', { variant: 'error' })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteStartupMutation.mutateAsync({ where: { id: startupId } })
      enqueueSnackbar('Startup deleted successfully', { variant: 'success' })
      router.push('/startups')
    } catch (error) {
      enqueueSnackbar('Failed to delete startup', { variant: 'error' })
    }
  }

  const handleUpload = async ({ file }) => {
    try {
      const { url } = await upload({ file })
      await createDocumentMutation.mutateAsync({
        data: {
          filename: file.name,
          filepathUrl: url,
          startupId: startupId,
        },
      })
      enqueueSnackbar('Document uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to upload document', { variant: 'error' })
    }
  }

  const handleDeleteDocument = async documentId => {
    try {
      await deleteDocumentMutation.mutateAsync({ where: { id: documentId } })
      enqueueSnackbar('Document deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete document', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Filename',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<DownloadOutlined />}
            href={record.filepathUrl}
            target="_blank"
          >
            Download
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteDocument(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Startup Details</Title>
      <Paragraph>View and manage the details of the startup.</Paragraph>
      {isEditing ? (
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="performanceMetrics" label="Performance Metrics">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <div>
          <Title level={4}>{startup?.name}</Title>
          <Paragraph>{startup?.description}</Paragraph>
          <Paragraph>{startup?.performanceMetrics}</Paragraph>
          <Space>
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
            <Popconfirm title="Sure to delete?" onConfirm={handleDelete}>
              <Button icon={<DeleteOutlined />} danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      )}
      <Title level={4}>Documents</Title>
      <Upload customRequest={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload Document</Button>
      </Upload>
      <Table dataSource={startup?.documents} columns={columns} rowKey="id" />
    </PageLayout>
  )
}
