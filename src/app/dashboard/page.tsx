'use client'

import { LateralMenu } from "../components/LateralMenu";
import { UserList } from "../components/UserList";


export default function Dashboard() {


    return(
        <main className="w-screen h-screen relative">
            <LateralMenu />
            <UserList />
        </main>
    )
}