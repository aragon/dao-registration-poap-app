import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import type { NextPage } from 'next'
import { apolloClient } from '../lib/apollo-client'
import { disconnect } from '@wagmi/core'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const LogoutPage: NextPage = () => {
  const router = useRouter()

  const handleLogOut = useCallback(async () => {
    apolloClient.clearStore()
    await disconnect()
    localStorage.setItem(publicRuntimeConfig.loginKey, '')
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
