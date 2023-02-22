import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'
import { apolloClient } from '../lib/apollo-client'
import { disconnect } from '@wagmi/core'

const LogoutPage: NextPage = () => {
  const router = useRouter()

  const handleLogOut = useCallback(async () => {
    apolloClient.clearStore()
    await disconnect()
    localStorage.setItem(process.env.NEXT_PUBLIC_LOGIN_KEY, '')
    router.push('/')
  }, [router])

  useEffect(() => {
    if (true) {
      handleLogOut()
    }
  }, [handleLogOut])

  return null
}

export default LogoutPage
