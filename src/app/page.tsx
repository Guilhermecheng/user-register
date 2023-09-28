
import { LoginForm } from './components/LoginForm'
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-[url('/background-alleasy.jpeg')] no-repeat bg-cover lg:bg-white flex flex-col items-center justify-between py-32 md:py-20 lg:py-0 lg:grid lg:grid-cols-5">
      <div className="flex flex-col items-center justify-center px-8 text-white col-span-3">
        <div className='flex flex-col lg:flex-row items-center justify-center'>
          <RecentActorsIcon className='flex' style={{fontSize: '100px'}}/>
          <h1 className='mt-2 lg:mt-0 lg:ml-4 text-2xl md:text-3xl lg:text-5xl font-semibold'>Lorem Ipsum</h1>
        </div>
        <p className='hidden lg:flex mt-2 lg:mt-4 text-xs lg:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>
      <div className='w-full lg:h-full flex flex-col items-center justify-center px-6 lg:px-20 lg:bg-white lg:shadow-zinc-900/50 lg:shadow-inner lg:col-span-2'>
        <LoginForm />
      </div>
      <p className='flex lg:hidden mt-4 text-xs text-white'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit"</p>
    </main>
  )
}
