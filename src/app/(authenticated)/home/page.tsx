'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { BellOutlined, LineChartOutlined } from '@ant-design/icons'
import { Avatar, Card, Col, List, Row, Spin, Typography } from 'antd'
import dayjs from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
const { Title, Text, Paragraph } = Typography

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: userData, isLoading: userLoading } =
    Api.user.findUnique.useQuery({
      where: { id: user?.id },
      include: {
        startups: true,
        investors: { include: { investments: true } },
      },
    })

  if (userLoading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Dashboard</Title>
      <Paragraph>
        Get an overview of your portfolio's performance and stay informed about
        important updates.
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <LineChartOutlined /> Key Metrics
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={userData?.startups}
              renderItem={startup => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<LineChartOutlined />} />}
                    title={startup.name}
                    description={`Performance Metrics: ${startup.performanceMetrics}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <BellOutlined /> Notifications
              </>
            }
            bordered={false}
          >
            <List
              itemLayout="horizontal"
              dataSource={userData?.investors}
              renderItem={investor => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BellOutlined />} />}
                    title={investor.name}
                    description={`Last Update: ${dayjs(investor.dateUpdated).format('YYYY-MM-DD')}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
