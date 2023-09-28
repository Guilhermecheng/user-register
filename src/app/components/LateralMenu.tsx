'use client'

import { Button } from '@mui/base';
import { useContext } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditNoteIcon from '@mui/icons-material/EditNote';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { GlobalContext } from '../contexts/GlobalContext';
import CreateUser from './CreateUser';
import EditUser from './EditUser';


export function LateralMenu() {
    const router = useRouter();
    const { isLateralMenuOpen, setisLateralMenuOpen } = useContext(GlobalContext);

    function logout() {
        router.push('/');
    }

    return (
        <div className={`hidden sm:block absolute top-0 left-0 h-screen w-[100px] ${isLateralMenuOpen ? "lg:w-[300px]" : "lg:w-[100px]"} bg-alleasy-blue text-white shadow-lg shadow-black px-0 lg:px-8 py-10 transition-all duration-150`}>

            <div className='flex flex-col items-center gap-y-4 text-sm'>
                <div className={`flex items-center ${isLateralMenuOpen ? '' : 'flex-col justify-center' }`}>
                    <RecentActorsIcon className='flex' fontSize='large' />

                    <h1 className={`hidden ${isLateralMenuOpen ? 'lg:flex' : 'lg:hidden' } lg:ml-4 text-sm font-bold`}>Lorem Ipsum</h1>

                    <div className={`hidden lg:flex cursor-pointer  hover:bg-white/20 rounded-md ${isLateralMenuOpen ? "ml-8" : "rotate-180 mt-4"} transition-all`}>
                        <KeyboardDoubleArrowLeftIcon 
                            onClick={() => setisLateralMenuOpen(!isLateralMenuOpen)} 
                        />
                    </div>
                </div>

                <div className='mt-16'>
                    <CreateUser>
                        <PersonAddAlt1Icon />
                        <span className={`hidden ml-2 ${isLateralMenuOpen ? 'lg:flex' : 'lg:hidden' }`}>Cadastrar novo usuário</span>
                    </CreateUser>
                </div>
                
                <EditUser>
                    <EditNoteIcon />
                    <span className={`hidden ml-2 ${isLateralMenuOpen ? 'lg:flex' : 'lg:hidden' }`}>Editar lista de usuários</span>
                </EditUser>
                

                <div className='absolute bottom-8 flex flex-col items-center w-full px-8'>
                    <div className='h-[2px] w-full bg-zinc-100/20' />

                    <div className='flex items-center mt-4'>
                        <Image alt="Guilherme" src="https://github.com/Guilhermecheng.png" width={40} height={40} className='rounded-full border-2 border-white w-8 lg:w-10' />
                        <h1 className={`hidden ${isLateralMenuOpen ? 'lg:flex' : 'lg:hidden' } ml-4 text-bold`}>
                            Lorem Ipsum
                        </h1>
                    </div>
                    <Button onClick={logout} className="flex items-center hover:bg-white/20 cursor-pointer mt-4 px-4 py-2 rounded-md text-xs">
                        <MeetingRoomIcon />
                        <span className={`hidden ml-2 ${isLateralMenuOpen ? 'lg:flex' : 'lg:hidden' }`}>Logout</span>
                    </Button>
                </div>
            </div>

        </div>
    )
}