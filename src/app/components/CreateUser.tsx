'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../contexts/GlobalContext';
import Image from 'next/image';

import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from '@mui/base';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import TextField from '@mui/material/TextField';
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
  city: z.string().min(1, { message: "Informe sua cidade" }),
})

type CreateUsersValidationSchema = z.infer<typeof createUserValidations>;


function SimpleDialog(props: DialogProps) {
  const { users, setUsers } = React.useContext(GlobalContext);
  const [nationality, setNationality] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState<any>()

  const { onClose, open } = props;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUsersValidationSchema>({
      resolver: zodResolver(createUserValidations),
  });

  function handleSelectNatChange(event: any) {
    setNationality(event.target.value);
  };

  function handleClose() {
    reset();
    setSelectedImage(null);
    onClose();
  };

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setSelectedImage(e.target?.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function createUser(data: CreateUsersValidationSchema) {
    let newUser : UserProps;

    if(selectedImage) {
      newUser = {
        name: {
          first: data.name,
          last: data.lastname,
        },
        email: data.email,
        nat: data.nat,
        location: {
          city: data.city
        },
        picture: {
          medium: selectedImage
        }
      }

    } else {
      newUser = {
        name: {
          first: data.name,
          last: data.lastname,
        },
        email: data.email,
        nat: data.nat,
        location: {
          city: data.city
        }
      }
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
        <form className='flex flex-col w-full relative' onSubmit={handleSubmit(createUser)}>
          <TextField label="Nome" variant="outlined" {...register("name", { required: true })} />
          {errors.name && <span className="mt-1 text-xs text-red-500">{errors.name?.message}</span>}

          <TextField sx={{ marginTop: 2 }}  label="Sobrenome" variant="outlined" {...register("lastname", { required: true })} />
          {errors.lastname && <span className="mt-1 text-xs text-red-500">{errors.lastname?.message}</span>}

          <TextField sx={{ marginTop: 2 }} label="Email" variant="outlined"  {...register("email", { required: true })} />
          {errors.email && <span className="mt-1 text-xs text-red-500">{errors.email?.message}</span>}

          <FormControl fullWidth sx={{ marginTop: 2 }}>
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
          {errors.nat && <span className="mt-1 text-xs text-red-500">{errors.nat?.message}</span>}

          <TextField sx={{ marginTop: 2 }} label="Cidade" variant="outlined"  {...register("city", { required: true })} />
          {errors.city && <span className="mt-1 text-xs text-red-500">{errors.city?.message}</span>}

          <label htmlFor="image" className='text-sm text-zinc-500 my-4'>Imagem</label>
          <div className='w-full flex items-center justify-between'>

            { selectedImage ? <Image src={selectedImage} alt={'Imagem postada'} width={80} height={80} /> : <div className='w-20 h-20' />}
            <input  type="file" accept='image/*' onChange={handleImage} className="w-[60%] ml-4"  />
          </div>

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
