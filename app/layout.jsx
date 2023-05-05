import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@styles/globals.css'

export const metadata = {
    title: 'Promptia',
    description: 'Discover and share AI prompts'
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
