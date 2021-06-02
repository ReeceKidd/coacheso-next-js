/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

const callAPI = async (body, headers) => {
  const res = await fetch(`${process.env.SERVER_URL}/graphql`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
    cache: 'no-cache',
  })
  return {
    body: await res.text(),
    status: res.status,
    headers: res.headers,
  }
}

const forwardHeader = (res, apiRes, header) => {
  if (apiRes.headers.get(header)) {
    res.setHeader(header, apiRes.headers.get(header))
  }
}

const forwardResponse = (res, apiRes) => {
  forwardHeader(res, apiRes, 'content-type')
  forwardHeader(res, apiRes, 'www-authenticate')
  res.status(apiRes.status)
  res.send(apiRes.body)
}

export default async function graphql(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    try {
      const { accessToken } = await getAccessToken(req, res)

      const apiRes = await callAPI(req.body, {
        authorization: `Bearer ${accessToken}`,
      })
      forwardResponse(res, apiRes)
    } catch (err) {
      const apiRes = await callAPI(req.body, {})
      forwardResponse(res, apiRes)
    }
  } catch (error) {
    res.status(error.status || 400).end(error.message)
  }
}
