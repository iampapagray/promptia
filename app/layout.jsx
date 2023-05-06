import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@styles/globals.css'

export const metadata = {
    title: 'Promptia',
    description: 'Promptia is a community AI prompting tool for everyone to discover, create and share creative prompts'
}

const RootLayout = ({children}) => {
  return (
   <html lanf="en">
    <body>
        <Provider>
            <div className="main">
                <div className="gradient" />
            </div>

            <main className="app">
                <Nav />
                {children}
            </main>
        </Provider>
    </body>
   </html>
  )
}

export default RootLayout
