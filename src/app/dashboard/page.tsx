'use client'

import { LateralMenu } from "../components/LateralMenu";
import { MobileMenu } from "../components/MobileMenu";
import { UserList } from "../components/UserList";


export default function Dashboard() {


    return(
        <main className="w-screen h-screen relative">
            <MobileMenu />
            <LateralMenu />
            <UserList />
        </main>
    )
}