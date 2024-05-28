import React from 'react'
import ReactDOM from 'react-dom/client'
import useMockAdapter from 'src/api/useMockAdapter'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = ReactDOM.createRoot(
  document.getElementById('root')!
)

const queryClient = new QueryClient()

const RootApp = (): JSX.Element => {
  useMockAdapter()
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
)
