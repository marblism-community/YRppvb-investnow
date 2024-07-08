'use client'

import { useUserContext } from '@/core/context'
import { useUploadPublic } from '@/core/hooks/upload'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  List,
  Modal,
  Spin,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
const { Title, Text } = Typography

export default function InvestorDetailsPage() {
  const router = useRouter()
  const params = useParams<{ investorId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [form] = Form.useForm()

  const { data: investor, isLoading: isInvestorLoading } =
    Api.investor.findUnique.useQuery({
      where: { id: params.investorId },
      include: { user: true, documents: true, investments: true },
    })

  const updateInvestorMutation = Api.investor.update.useMutation()
  const deleteInvestorMutation = Api.investor.delete.useMutation()
  const createDocumentMutation = Api.document.create.useMutation()
  const deleteDocumentMutation = Api.document.delete.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  const handleEdit = async (values: any) => {
    try {
      await updateInvestorMutation.mutateAsync({
        where: { id: params.investorId },
        data: values,
      })
      enqueueSnackbar('Investor updated successfully', { variant: 'success' })
      setIsEditing(false)
    } catch (error) {
      enqueueSnackbar('Failed to update investor', { variant: 'error' })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteInvestorMutation.mutateAsync({
        where: { id: params.investorId },
      })
      enqueueSnackbar('Investor deleted successfully', { variant: 'success' })
      router.push('/investors')
    } catch (error) {
      enqueueSnackbar('Failed to delete investor', { variant: 'error' })
    }
  }

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true)
      const { url } = await upload({ file })
      await createDocumentMutation.mutateAsync({
        data: {
          filename: file.name,
          filepathUrl: url,
          investorId: params.investorId,
        },
      })
      enqueueSnackbar('Document uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to upload document', { variant: 'error' })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteDocument = async (documentId: string) => {
    try {
      await deleteDocumentMutation.mutateAsync({ where: { id: documentId } })
      enqueueSnackbar('Document deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete document', { variant: 'error' })
    }
  }

  if (isInvestorLoading) {
    return (
      <PageLayout layout="full-width">
        <Spin />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Investor Details</Title>
      <Text>View and manage the details of the investor.</Text>
      <div style={{ marginTop: 20 }}>
        <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={handleDelete}
          style={{ marginLeft: 10 }}
        >
          Delete
        </Button>
      </div>
      <Form
        form={form}
        initialValues={investor}
        onFinish={handleEdit}
        layout="vertical"
        style={{ marginTop: 20 }}
      >
        <Form.Item name="name" label="Name">
          <Input disabled={!isEditing} />
        </Form.Item>
        <Form.Item name="contactInfo" label="Contact Info">
          <Input disabled={!isEditing} />
        </Form.Item>
        {isEditing && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
      <Title level={3}>Documents</Title>
      <Upload
        beforeUpload={handleUpload}
        showUploadList={false}
        disabled={isUploading}
      >
        <Button icon={<UploadOutlined />} loading={isUploading}>
          Upload Document
        </Button>
      </Upload>
      <List
        itemLayout="horizontal"
        dataSource={investor?.documents}
        renderItem={document => (
          <List.Item
            actions={[
              <Button
                icon={<DownloadOutlined />}
                href={document.filepathUrl}
                target="_blank"
              >
                Download
              </Button>,
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDeleteDocument(document.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={document.filename}
              description={`Uploaded on ${dayjs(document.dateCreated).format('YYYY-MM-DD')}`}
            />
          </List.Item>
        )}
      />
      <Title level={3}>Investments</Title>
      <List
        itemLayout="horizontal"
        dataSource={investor?.investments}
        renderItem={investment => (
          <List.Item>
            <List.Item.Meta
              title={`Investment`}
              description={`Amount: $${investment.amount.toString()} on ${dayjs(investment.date).format('YYYY-MM-DD')}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Delete Investor"
        visible={isDeleting}
        onOk={handleDelete}
        onCancel={() => setIsDeleting(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <Text>Are you sure you want to delete this investor?</Text>
      </Modal>
    </PageLayout>
  )
}
