
import { LoginForm } from './components/LoginForm'
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[url('/background-alleasy.jpeg')] no-repeat bg-cover md:bg-white flex flex-col items-center justify-between py-32 md:py-0 md:grid md:grid-cols-2 ">
      <div className="flex flex-col items-center justify-center px-8 text-white">
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <RecentActorsIcon className='flex' style={{fontSize: '100px'}}/>
          <h1 className='mt-2 md:mt-0 md:ml-4 text-2xl md:text-3xl lg:text-5xl font-semibold'>Lorem Ipsum</h1>
        </div>
        <p className='hidden md:flex mt-2 lg:mt-4 text-xs lg:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className='w-full md:h-full flex flex-col items-center justify-center px-6 md:bg-white shadow-zinc-900/50 shadow-inner'>
        <LoginForm />
      </div>
      <p className='flex md:hidden mt-4 text-xs text-white'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit"</p>

    </main>
  )
}
