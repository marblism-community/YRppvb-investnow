'use client'

import {
  UploadOutlined,
  FileExcelOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { Typography, Button, Upload, Row, Col, Spin } from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function IntegrationsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const { mutateAsync: upload } = useUploadPublic()

  const handleStripeLink = async () => {
    try {
      const paymentLink = await Api.billing.createPaymentLink({
        productId: 'stripe-link',
      })
      window.location.href = paymentLink
    } catch (error) {
      enqueueSnackbar('Failed to link Stripe account', { variant: 'error' })
    }
  }

  const handleCsvUpload = async () => {
    if (!csvFile) {
      enqueueSnackbar('Please select a CSV file to upload', {
        variant: 'error',
      })
      return
    }
    try {
      const { url } = await upload({ file: csvFile })
      // Assuming there's an API endpoint to process the uploaded CSV
      await Api.data.processCsv({ url })
      enqueueSnackbar('CSV file uploaded and processed successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to upload and process CSV file', {
        variant: 'error',
      })
    }
  }

  const uploadProps = {
    beforeUpload: (file: File) => {
      setCsvFile(file)
      return false
    },
    fileList: csvFile ? [csvFile] : [],
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Title level={2}>Integrations</Title>
          <Paragraph>
            As a venture capitalist, you can link your account to a Stripe
            payment system to manage financial transactions.
          </Paragraph>
          <Button
            type="primary"
            icon={<DollarOutlined />}
            onClick={handleStripeLink}
            style={{ marginBottom: '20px' }}
          >
            Link Stripe Account
          </Button>
          <Paragraph>
            You can also parse CSV files to import data about startups and
            investors to quickly update your portfolio.
          </Paragraph>
          <Upload {...uploadProps}>
            <Button icon={<FileExcelOutlined />}>Select CSV File</Button>
          </Upload>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={handleCsvUpload}
            style={{ marginTop: '20px' }}
          >
            Upload and Process CSV
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
