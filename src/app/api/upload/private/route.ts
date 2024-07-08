import { Authentication } from '@/core/authentication'
import { UploadFileType, UploadService } from '@/server/libraries/upload'
import { NextRequest, NextResponse } from 'next/server'
import { zfd } from 'zod-form-data'

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await Authentication.getSession()

  if (!session?.user) {
    return NextResponse.error()
  }

  const schema = zfd.formData({
    file: zfd.file(),
  })

  try {
    const formData = await request.formData()

    const data = schema.parse({
      file: formData.get('file'),
    })

    const arrayBuffer = await data.file.arrayBuffer()

    const file: UploadFileType = {
      name: data.file.name,
      mimetype: data.file.type,
      buffer: Buffer.from(arrayBuffer),
    }

    const urls = await UploadService.uploadPrivate(file)

    return NextResponse.json(urls?.[0])
  } catch (error) {
    console.log(error)
    return NextResponse.error()
  }
}
