import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core'

class MyDocument extends Document {
  static async getInitialProps(
    context: any
  ): Promise<{
    styles: Record<string, unknown>[]
    html: string
    head?: JSX.Element[]
  }> {
    // Render the app and get the context with collected side effects
    const sheets = new ServerStyleSheets()
    const originalRenderPage = context.renderPage

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })
    const initialProps = await Document.getInitialProps(context)
    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    )
  }
}

export default MyDocument
