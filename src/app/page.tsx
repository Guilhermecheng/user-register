
import { LoginForm } from './components/LoginForm'

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[url('/background-alleasy.jpeg')] no-repeat bg-cover">
      <div className='w-full h-full flex flex-col items-center justify-center p-12 md:p-24 bg-black/50'>
        <LoginForm />
      </div>
    </main>
  )
}
