import React from 'react'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core'

class MyDocument extends Document {
  static async getInitialProps(
    context: DocumentContext
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
      <Html lang="en">
        <Head>
          <script
            async
            defer
            data-domain="coacheso.com"
            src="https://plausible.io/js/plausible.js"
          />
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
