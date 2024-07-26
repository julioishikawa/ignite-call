import { google } from 'googleapis'
import { prisma } from './prisma'
import dayjs from 'dayjs'

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      userId,
    },
  })

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  auth.setCredentials({
    access_token: account.accessToken,
    refresh_token: account.refreshToken,
    expiry_date: account.accessTokenExpiresAt
      ? account.accessTokenExpiresAt * 1000
      : null,
  })

  if (!account.accessTokenExpiresAt) {
    return auth
  }

  // expiration time in miliseconds
  const isTokenExpired = dayjs(account.accessTokenExpiresAt * 1000).isBefore(
    new Date(),
  )

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        accessToken: access_token,
        accessTokenExpiresAt: expiry_date
          ? Math.floor(expiry_date / 1000)
          : null,
        idToken: id_token,
        refreshToken: refresh_token,
        scope,
        tokenType: token_type,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    })
  }

  return auth
}
