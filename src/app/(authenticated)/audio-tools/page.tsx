'use client'

import { useState } from 'react'
import { Typography, Upload, Button, Input, Row, Col, Space } from 'antd'
import {
  UploadOutlined,
  AudioOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AudioToolsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: upload } = useUploadPublic()
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [text, setText] = useState<string>('')
  const [transcription, setTranscription] = useState<string>('')
  const [audioFileUrl, setAudioFileUrl] = useState<string>('')

  const handleAudioUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      setAudioUrl(url)
      const response = await Api.ai.audioToText({ url })
      setTranscription(response.translation)
      enqueueSnackbar('Audio converted to text successfully!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to convert audio to text.', { variant: 'error' })
    }
  }

  const handleTextToAudio = async () => {
    try {
      const response = await Api.ai.textToAudio({ text })
      setAudioFileUrl(response.url)
      enqueueSnackbar('Text converted to audio successfully!', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to convert text to audio.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Row
        justify="center"
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Col>
          <Title>Audio Tools</Title>
          <Paragraph>
            As a venture capitalist, you can convert audio notes to text and
            text to audio for easy documentation and listening on the go.
          </Paragraph>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>Convert Audio to Text</Title>
            <Upload beforeUpload={handleAudioUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload Audio File</Button>
            </Upload>
            {transcription && (
              <Paragraph>
                <Text strong>Transcription:</Text> {transcription}
              </Paragraph>
            )}
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={4}>Convert Text to Audio</Title>
            <Input.TextArea
              rows={4}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter text to convert to audio"
            />
            <Button
              type="primary"
              icon={<AudioOutlined />}
              onClick={handleTextToAudio}
            >
              Convert to Audio
            </Button>
            {audioFileUrl && (
              <audio controls src={audioFileUrl}>
                Your browser does not support the audio element.
              </audio>
            )}
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
