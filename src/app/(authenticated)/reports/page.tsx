'use client'

import { Typography, Row, Col, Card, Spin } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ReportsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: userData, isLoading } = Api.user.findUnique.useQuery({
    where: { id: user?.id },
    include: {
      startups: { include: { documents: true, investments: true } },
      investors: { include: { documents: true, investments: true } },
    },
  })

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!userData) {
    return (
      <PageLayout layout="full-width">
        <Title level={2}>Reports</Title>
        <Paragraph>No data available.</Paragraph>
      </PageLayout>
    )
  }

  const renderStartupReports = () => {
    return userData.startups?.map(startup => (
      <Col span={24} key={startup.id}>
        <Card
          title={startup.name}
          bordered={false}
          style={{ marginBottom: '16px' }}
        >
          <Text>
            Performance Metrics: {startup.performanceMetrics || 'N/A'}
          </Text>
          <br />
          <Text>
            Created: {dayjs(startup.dateCreated).format('DD/MM/YYYY')}
          </Text>
          <br />
          <Text>
            Updated: {dayjs(startup.dateUpdated).format('DD/MM/YYYY')}
          </Text>
        </Card>
      </Col>
    ))
  }

  const renderInvestorReports = () => {
    return userData.investors?.map(investor => (
      <Col span={24} key={investor.id}>
        <Card
          title={investor.name}
          bordered={false}
          style={{ marginBottom: '16px' }}
        >
          <Text>Contact Info: {investor.contactInfo || 'N/A'}</Text>
          <br />
          <Text>
            Created: {dayjs(investor.dateCreated).format('DD/MM/YYYY')}
          </Text>
          <br />
          <Text>
            Updated: {dayjs(investor.dateUpdated).format('DD/MM/YYYY')}
          </Text>
        </Card>
      </Col>
    ))
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Reports</Title>
      <Paragraph>
        Generate reports on your portfolio to share performance data with
        stakeholders.
      </Paragraph>
      <Row gutter={16} justify="center">
        <Col span={24}>
          <Title level={4}>
            <FileTextOutlined /> Startups
          </Title>
          <Row gutter={16}>{renderStartupReports()}</Row>
        </Col>
        <Col span={24}>
          <Title level={4}>
            <FileTextOutlined /> Investors
          </Title>
          <Row gutter={16}>{renderInvestorReports()}</Row>
        </Col>
      </Row>
    </PageLayout>
  )
}
