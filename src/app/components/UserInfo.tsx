'use client'

import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/base';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { GlobalContext } from '../contexts/GlobalContext';
import Image from 'next/image';

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

interface UserInfoProps {
    children: React.ReactNode,
    userId: number;
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  userId: number;
}

function SimpleDialog(props: DialogProps) {
  const { onClose, open } = props;
  const { users } = React.useContext(GlobalContext);
  const [user, setUser] = React.useState<UserProps>();


  React.useEffect(() => {
    if(users) {
      let userInfo = users[props.userId];
      setUser(userInfo);
    }
  },[users])


  const handleClose = () => {
    onClose();
  };

  if(!user) return <>Ooops, something is wrong..</>

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

    <div className='flex items-center px-8 py-6'>
      { user.picture ? (
        <Image src={user.picture.medium} alt={user.name.first} width={80} height={80} className='rounded-full' />
      ) : (
        <AccountCircleIcon className="text-zinc-400"  sx={{ fontSize: '40px' }} />
      ) } 
      <DialogTitle  sx={{ m: 0, p: 2 }}>{user.name.first} {user.name.last}</DialogTitle>
    </div>

    <div className='w-full flex items-center justify-center pb-6'>
      <div className='h-[2px] w-[90%] bg-zinc-500/20' />
    </div>

      <DialogContent className="flex flex-col gap-y-4 w-full pb-8">
        <div className='flex text-sm md:text-base'>
          <h2 className='font-bold mr-2'>Email:</h2>
          <span>{ user.email }</span>
        </div>

        <div className='flex text-sm md:text-base'>
          <h2 className='font-bold mr-2'>Gênero:</h2>
          <span>{ user.gender ? user.gender : "-" }</span>
        </div>

        <div className='flex text-sm md:text-base'>
          <h2 className='font-bold mr-2'>Endereço:</h2>
          <span>{ user.location ? user.location.city : "-" }</span>
        </div>

        <div className='flex text-sm md:text-base'>
          <h2 className='font-bold mr-2'>Nacionalidade:</h2> <span>{ user.nat ? user.nat : "-" }</span>
        </div>

        <div className='flex text-sm md:text-base'>
          <h2 className='font-bold mr-2'>País:</h2> <span>{ user.country ? user.country : "-" }</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};

export default function UserInfo({ children, userId }: UserInfoProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button 
            onClick={handleClickOpen} 
            className="text-center px-6 py-2 whitespace-nowrap hover:text-alleasy-red/90 hover:underline hover:underline-offset-4"
        >
            {children}
        </Button>

        <SimpleDialog
            open={open}
            onClose={handleClose}
            userId={userId}
        />
    </div>
  );
}
