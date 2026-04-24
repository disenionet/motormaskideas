import { Suspense } from 'react'
import LoginForm from './LoginForm'

// Loading fallback para Suspense
function LoginSkeleton() {
  return (
    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
