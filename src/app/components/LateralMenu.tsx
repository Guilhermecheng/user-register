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


export function LateralMenu() {
    const router = useRouter();
    const { isLateralMenuOpen, setisLateralMenuOpen } = useContext(GlobalContext);

    function logout() {
        router.push('/');
    }

    return (
        <div className={`absolute top-0 left-0 h-screen w-[100px] ${isLateralMenuOpen ? "md:w-[300px]" : "md:w-[100px]"} bg-alleasy-blue text-white shadow-lg shadow-black px-0 md:px-8 py-10 transition-all `}>

            <div className='flex flex-col items-center gap-y-4 text-sm'>
                <div className='flex items-center'>
                    <RecentActorsIcon className='flex text-4xl' />
                    <h1 className={`hidden ${isLateralMenuOpen ? 'md:flex' : 'md:hidden' } md:ml-4 text-sm font-bold`}>AllEasy`s Userbook</h1>

                    <KeyboardDoubleArrowLeftIcon 
                        className={`hidden ${isLateralMenuOpen ? 'md:flex' : 'md:hidden' } ml-8 cursor-pointer hover:bg-white/20 rounded-md`}
                        onClick={() => setisLateralMenuOpen(!isLateralMenuOpen)} 
                    />
                </div>
                <KeyboardDoubleArrowRightIcon 
                    className={`hidden ${isLateralMenuOpen ? 'md:hidden' : 'md:flex'} cursor-pointer hover:bg-white/20 rounded-md`} 
                    onClick={() => setisLateralMenuOpen(!isLateralMenuOpen)} 
                />


                <div className='flex items-center hover:bg-white/20 cursor-pointer px-4 py-2 mt-16 rounded-md'>
                    <PersonAddAlt1Icon />
                    <span className={`hidden ml-2 ${isLateralMenuOpen ? 'md:flex' : 'md:hidden' }`}>Cadastrar novo usuário</span>
                </div>

                <div className='flex items-center hover:bg-white/20 cursor-pointer px-4 py-2 rounded-md'>
                    <EditNoteIcon />
                    <span className={`hidden ml-2 ${isLateralMenuOpen ? 'md:flex' : 'md:hidden' }`}>Editar lista de usuários</span>
                </div>

                <div className='absolute bottom-8 flex flex-col items-center w-full px-8'>
                    <div className='h-[2px] w-full bg-zinc-100/20' />

                    <div className='flex items-center mt-4'>
                        <Image alt="Guilherme" src="https://github.com/Guilhermecheng.png" width={40} height={40} className='rounded-full border-2 border-white w-8 md:w-10' />
                        <h1 className={`hidden ${isLateralMenuOpen ? 'md:flex' : 'md:hidden' } ml-4 text-bold`}>
                            Albert Einstein
                        </h1>
                    </div>
                    <Button onClick={logout} className="flex items-center hover:bg-white/20 cursor-pointer mt-4 px-4 py-2 rounded-md text-xs">
                        <MeetingRoomIcon />
                        <span className={`hidden ml-2 ${isLateralMenuOpen ? 'md:flex' : 'md:hidden' }`}>Logout</span>
                    </Button>
                </div>
            </div>

        </div>
    )
}