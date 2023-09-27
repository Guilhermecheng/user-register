import Image from "next/image";
import { useRouter } from "next/navigation";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CreateUserDialog from "./CreateUserDialog";

export function MobileMenu() {
    const router = useRouter();

    function logout() {
        router.push('/');
    }

    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 x top-6 py-4 px-4 w-[80%] sm:hidden bg-alleasy-blue rounded-xl flex items-center justify-between text-white z-20">
            <Image alt="Guilherme" src="https://github.com/Guilhermecheng.png" width={40} height={40} className='rounded-full border-2 border-white w-8 md:w-10' />

            <CreateUserDialog>
                <PersonAddAlt1Icon className="cursor-pointer hover:text-white/80" />
            </CreateUserDialog>
            
            <EditNoteIcon className="cursor-pointer hover:text-white/80" />
            <MeetingRoomIcon className="cursor-pointer hover:text-white/80" onClick={logout} />
        </div>
    )
}