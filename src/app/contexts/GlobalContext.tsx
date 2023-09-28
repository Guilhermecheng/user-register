'use client';

import axios from "axios";
import { createContext, ReactNode, SetStateAction, Dispatch, useEffect, useState } from "react";

interface UserProps {
    email: string;
    gender?: string;
    location?: {
        city: string;
        coordinates?: {
            latitude: number;
            longitude: number;
        }
    }
    country?: string;
    postcode?: string;
    state?: string;
    street?: {
        number: number;
        name: string;
    };
    timezone?: {
        description: string;
        offset: number;
    };
    name: {
        first: string;
        last: string;
        title?: string;
    }
    nat: string;
    picture?: {
        large?: string;
        medium: string;
        thumbnail?: string;
    }
  };

interface GlobalContextProps {
    users: UserProps[] | null;
    setUsers: Dispatch<SetStateAction<UserProps[] | null>>;
    isLateralMenuOpen: boolean, 
    setisLateralMenuOpen: Dispatch<SetStateAction<boolean>>,
}

export const GlobalContext = createContext<GlobalContextProps>({
    users: null,
    setUsers: () => {},
    isLateralMenuOpen: true, 
    setisLateralMenuOpen: () => {},
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<UserProps[] | null>(null);
    const [isLateralMenuOpen, setisLateralMenuOpen] = useState(true);

    useEffect(() => {
        axios.get('https://randomuser.me/api/?results=20&?nat=gb,br,us,fr,dk&inc=name,gender,email,nat,location,nat,picture').then((response) => {
            if(response.data) {
                setUsers(response.data.results);
            }
        })

    }, [])
    
    return (
        <GlobalContext.Provider value={{ 
            users,
            setUsers,
            isLateralMenuOpen, 
            setisLateralMenuOpen
        }}>
            {children}
        </GlobalContext.Provider>
    )
}