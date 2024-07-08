'use client'

import { useState } from 'react'
import { Typography, Input, Button, Row, Col, Spin } from 'antd'
import { SendOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AIAssistantPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const generateText = Api.ai.chat.useMutation()

  const handleSend = async () => {
    if (!prompt.trim()) {
      enqueueSnackbar('Please enter a prompt', { variant: 'error' })
      return
    }

    setLoading(true)
    try {
      const result = await generateText.mutateAsync({ prompt })
      setResponse(result.answer)
    } catch (error) {
      enqueueSnackbar('Failed to get response from AI', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col span={24}>
          <Title level={2}>AI Assistant</Title>
          <Paragraph>
            As a venture capitalist, chat with our AI assistant to get insights
            and recommendations for informed investment decisions.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <TextArea
            rows={4}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            style={{ marginTop: '10px', width: '100%' }}
            loading={loading}
          >
            Send
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          {loading ? (
            <Spin size="large" />
          ) : (
            response && (
              <div
                style={{
                  backgroundColor: '#f6f6f6',
                  padding: '20px',
                  borderRadius: '8px',
                }}
              >
                <Text>{response}</Text>
              </div>
            )
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
