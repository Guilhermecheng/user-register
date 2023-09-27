
import { LoginForm } from './components/LoginForm'
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[url('/background-alleasy.jpeg')] no-repeat bg-cover md:bg-white md:grid md:grid-cols-2 py-32 md:py-0">
      <div className="flex flex-col items-center justify-center md:bg-[url('/background-alleasy.jpeg')] md:no-repeat md:bg-cover text-white md:shadow-xl md:shadow-zinc-800">
        <RecentActorsIcon className='flex text-4xl' />
        <h1 className='mt-4 text-xl md:text-3xl font-semibold'>Lorem Ipsum</h1>
      </div>
      <div className='w-full h-full flex flex-col items-center justify-center px-4 md:bg-white'>
        <LoginForm />
      </div>
    </main>
  )
}
