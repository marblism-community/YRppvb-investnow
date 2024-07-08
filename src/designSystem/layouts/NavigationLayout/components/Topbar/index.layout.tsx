import { MenuOutlined } from '@ant-design/icons'
import { Avatar, Flex, Layout, Menu, Tag } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'

const { Header } = Layout

interface Props {
  isMobile?: boolean
  isLoggedIn?: boolean
  logo?: ReactNode
  items: { key: string; label: string; onClick: () => void }[]
  itemsMobile: { key: string; label: string; onClick: () => void }[]
}

export const Topbar: React.FC<Props> = ({
  isMobile = false,
  isLoggedIn = false,
  logo,
  items,
  itemsMobile,
}) => {
  const pathname = usePathname()

  const router = useRouter()

  const { user, isAdmin } = useUserContext()

  const style: any = {}

  const isThin = items.length === 0

  if (isThin) {
    style.height = '60px'
  }

  if (isMobile) {
    return (
      <>
        <Header>
          <Flex align="center" justify="space-between">
            <Flex style={{ padding: `12px 0 12px 0` }}>{logo}</Flex>

            <Menu
              mode="horizontal"
              items={itemsMobile}
              selectedKeys={[pathname]}
              style={{ width: 46 }}
              overflowedIndicator={<MenuOutlined />}
            />
          </Flex>
        </Header>
      </>
    )
  }

  return (
    <>
      <Header style={style}>
        <Flex align="center" style={style}>
          {logo}

          <Flex vertical flex={1}>
            <Menu
              mode="horizontal"
              items={items}
              selectedKeys={[pathname]}
              overflowedIndicator={<MenuOutlined />}
              style={{ flex: 1 }}
            />
          </Flex>

          <Flex align="center" gap="middle">
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <div>
                    <Tag color="red">Admin</Tag>
                  </div>
                )}

                <Avatar
                  src={user?.pictureUrl}
                  size="default"
                  onClick={() => router.push('/profile')}
                  style={{ cursor: 'pointer' }}
                >
                  {Utility.stringToInitials(user?.name)}
                </Avatar>
              </>
            )}
          </Flex>
        </Flex>
      </Header>
    </>
  )
}
