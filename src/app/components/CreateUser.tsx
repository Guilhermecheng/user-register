'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/base';

import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { GlobalContext } from '../contexts/GlobalContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface DialogProps {
    open: boolean;
    onClose: () => void;
}

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

const createUserValidations = z.object({
  name: z.string().min(1, { message: "Informe seu nome" }),
  lastname: z.string().min(1, { message: "Informe seu sobrenome" }),
  email: z.string().min(1, { message: "Informe seu email" }).email({
      message: "Insira um email válido",
  }),
  nat: z.string().min(1,{ message: "Informar nacionalidade" }),
  city: z.string().min(1, { message: "Informe sua cidade" })
})

type CreateUsersValidationSchema = z.infer<typeof createUserValidations>;


function SimpleDialog(props: DialogProps) {
  const { users, setUsers } = React.useContext(GlobalContext);

  const { onClose, open } = props;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUsersValidationSchema>({
      resolver: zodResolver(createUserValidations),
  });

  const [nationality, setNationality] = React.useState("");

  const handleSelectNatChange = (event: any) => {
    setNationality(event.target.value);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  function createUser(data: CreateUsersValidationSchema) {
    let newUser : UserProps = {
      name: {
        first: data.name,
        last: data.lastname,
      },
      email: data.email,
      nat: data.nat,
      location: {
        city: data.city
      },
      // picture: {
      //   data.picture
      // }
    }

    if(users) {
      setUsers([newUser, ...users]);
    } else {
      setUsers([newUser]);
    }
    
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle  sx={{ m: 0, p: 2 }}>Criar novo usuário</DialogTitle>

      <DialogContent dividers className="flex">
        <form className='flex flex-col w-full' onSubmit={handleSubmit(createUser)}>
          <TextField label="Nome" variant="outlined" {...register("name", { required: true })} />
          {errors.name && <span className="mt-1 text-xs text-red-500">{errors.name?.message}</span>}

          <TextField className='mt-4'  label="Sobrenome" variant="outlined" {...register("lastname", { required: true })} />
          {errors.lastname && <span className="mt-1 text-xs text-red-500">{errors.lastname?.message}</span>}

          <TextField className='mt-4'  label="Email" variant="outlined"  {...register("email", { required: true })} />
          {errors.email && <span className="mt-1 text-xs text-red-500">{errors.email?.message}</span>}

          <div className='mt-4'>
            <FormControl fullWidth>
              <InputLabel id="nationality-label">Nacionalidade</InputLabel>
              <Select
                {...register("nat", { required: true })}
                labelId="nationality-label"
                value={nationality}
                onChange={handleSelectNatChange}

              >
                <MenuItem value="AU">AU</MenuItem>
                <MenuItem value="BR">BR</MenuItem>
                <MenuItem value="CA">CA</MenuItem>
                <MenuItem value="CH">CH</MenuItem>
                <MenuItem value="DE">DE</MenuItem>
                <MenuItem value="DK">DK</MenuItem>
                <MenuItem value="ES">ES</MenuItem>
                <MenuItem value="FI">FI</MenuItem>
                <MenuItem value="FR">FR</MenuItem>
                <MenuItem value="GB">GB</MenuItem>
                <MenuItem value="IE">IE</MenuItem>
                <MenuItem value="IN">IN</MenuItem>
                <MenuItem value="IR">IR</MenuItem>
                <MenuItem value="MX">MX</MenuItem>
                <MenuItem value="NL">NL</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
                <MenuItem value="NZ">NZ</MenuItem>
                <MenuItem value="RS">RS</MenuItem>
                <MenuItem value="TR">TR</MenuItem>
                <MenuItem value="UA">UA</MenuItem>
                <MenuItem value="US">US</MenuItem>
              </Select>
            </FormControl>
          </div>
          {errors.nat && <span className="mt-1 text-xs text-red-500">{errors.nat?.message}</span>}

          <TextField className='mt-4'  label="Cidade" variant="outlined"  {...register("city", { required: true })} />
          {errors.city && <span className="mt-1 text-xs text-red-500">{errors.city?.message}</span>}


          <Button type='submit' className='mt-6 py-4 normal-case bg-alleasy-blue/90 hover:bg-blue-600 text-white rounded-md'>Cadastrar</Button>
        </form>
        
      </DialogContent>
      
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function CreateUser({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} className="flex items-center hover:bg-white/20 cursor-pointer px-4 py-2 rounded-md text-white normal-case">
        {children}
      </Button>

      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
