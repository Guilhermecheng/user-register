import Image from "next/image";
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import CreateUser from "./CreateUser";

interface UserProps {
    email: string;
    gender: string;
    location: {
        city: string;
        coordinates: {
            latitude: number;
            longitude: number;
        }
    }
    country: string;
    postcode: string;
    state: string;
    street: {
        number: number;
        name: string;
    };
    timezone: {
        description: string;
        offset: number;
    };
    name: {
        first: string;
        last: string;
        title: string;
    }
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    }
}


export function UserList() {
    const { users, isLateralMenuOpen } = useContext(GlobalContext);

    return (
        <section id="user-list" className={`absolute right-0 w-full mt-20 sm:mt-0 sm:w-[calc(100%-100px)] ${isLateralMenuOpen ? "lg:w-[calc(100%-300px)]" : "lg:w-[calc(100%-100px)]" }  transition-all duration-200`}>
            <div className="p-10 pb-40 lg:pb-20 rounded-md overflow-auto h-screen">
                <div className="flex w-full items-center justify-between gap-x-2 text-sm lg:text-base font-bold">

                    <div className="flex items-center justify-center text-xl lg:text-2xl rounded-lg">
                        <h1 className="">
                            {`${ users.length } usuários`}
                        </h1>
                    </div>

                    <CreateUser>
                        <div className="flex items-center justify-center p-4 bg-alleasy-blue/90 hover:bg-blue-600 text-white rounded-lg cursor-pointer">
                            <h1 className="">Novo usuário +</h1>
                        </div>
                    </CreateUser>
                </div>

                <div className='h-[2px] w-full bg-zinc-500/40 my-8' />

                <table id="mobile-table" className="w-full md:hidden">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>+</th>
                        </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-zinc-100">
                        { users.map((user: UserProps, i: number) => {
                        
                            return (
                                <tr key={i} className='border-b text-sm'>
                                    <td className="text-center px-6 py-2 whitespace-nowrap flex items-center">
                                        <Image src={ user.picture.medium } alt={ user.name.first } width={40} height={40} className="rounded-full" />
                                        <span className="ml-4">{ user.name.first } { user.name.last }</span>
                                    </td>
                                    <td className="text-center px-6 py-2 whitespace-nowrap">+ info</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 

                <div id="desktop-table-container" className="hidden md:block w-full">
                    <table id="desktop-table" className="w-full">
                        <thead>
                            <tr className="text-sm sm:text-base">
                                <th>Usuário</th>
                                <th>Email</th>
                                <th>Nacionalidade</th>
                                <th>Cidade</th>
                            </tr>
                        </thead>
                        <tbody className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-zinc-100">
                            { users.map((user: UserProps, i: number) => {
                            
                                return (
                                    <tr key={i} className='border-b text-xs sm:text-sm cursor-pointer hover:bg-alleasy-blue/50'>
                                        <td className="text-center pl-6 py-2 whitespace-nowrap flex items-center justify-start">
                                            <Image src={ user.picture.medium } alt={ user.name.first } width={40} height={40} className="rounded-full lg:mr-6" />
                                            <span className="ml-4">{ user.name.first } <span className='hidden lg:inline-flex'>{ user.name.last }</span></span>
                                        </td>
                                        <td className="text-center px-6 py-2 whitespace-nowrap">{ user.email }</td>
                                        <td className="text-center px-6 py-2 whitespace-nowrap">{ user.nat }</td>
                                        <td className="text-center px-6 py-2 whitespace-nowrap">{ user.location.city }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}