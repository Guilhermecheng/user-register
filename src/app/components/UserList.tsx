import Image from "next/image";
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"

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
    console.log(users)

    return (
        <section id="user-list" className={`absolute right-0 w-[calc(100%-100px)] ${isLateralMenuOpen ? "md:w-[calc(100%-300px)]" : "md:w-[calc(100%-100px)]" }`}>
            <div className="p-10 pb-20 rounded-md overflow-auto h-screen">
                <div className="flex items-centergap-x-2">
                    <h1>Total users: </h1>
                    <h1>{ users.length }</h1>
                </div>

                <div className="" />

                <table className="min-w-full">

                    <thead>
                        <tr>
                            <th>pic</th>
                            <th>name</th>
                            <th>gender</th>
                            <th>nat</th>
                            <th>location</th>
                        </tr>
                    </thead>
                    <tbody className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-zinc-100">
                        { users.map((user: UserProps, i: number) => {
                        
                            return (
                                <tr key={i} className='border-b text-sm'>
                                    <td className="text-center md:px-6 py-2 whitespace-nowrap">
                                        <Image src={ user.picture.medium } alt={ user.name.first } width={40} height={40} className="rounded-full" />
                                    </td>
                                    <td className="text-center px-6 py-2 whitespace-nowrap">{ user.name.first }</td>
                                    <td className="text-center px-6 py-2 whitespace-nowrap">{ user.gender }</td>
                                    <td className="text-center px-6 py-2 whitespace-nowrap">{ user.nat }</td>
                                    <td className="text-center px-6 py-2 whitespace-nowrap">{ user.location.city }</td>
                                </tr>
                            )
                        })}
                    </tbody>


                </table>
            </div>

        </section>
    )
}