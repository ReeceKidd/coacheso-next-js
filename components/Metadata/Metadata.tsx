import Head from 'next/head'
import { useRouter } from 'next/router'

export interface MetadataProps {
  title: string
  description: string
}

export const Metadata = ({ title, description }: MetadataProps): JSX.Element => {
  const site = 'https://coacheso.com'
  const canonicalURL = site + useRouter().pathname
  return (
    <Head>
      <link rel="canonical" href={canonicalURL} />
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <meta charSet="utf-8" key="charSet" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:description" content={description} key="ogdescription" />
      <meta name="twitter:title" content={title} key="twitterTitle" />
      <meta name="twitter:description" content={description} key="twitterDescription" />
    </Head>
  )
}
