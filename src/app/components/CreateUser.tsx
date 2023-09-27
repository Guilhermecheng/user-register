import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/base';

import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

interface DialogProps {
    open: boolean;
    onClose: () => void;
}

const createUserValidations = z.object({
  name: z.string(),
  email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
  }),
  nat: z.string(),
  city: z.string()
})

type CreateUsersValidationSchema = z.infer<typeof createUserValidations>;


function SimpleDialog(props: DialogProps) {
  const { onClose, open } = props;
  
  const { register, handleSubmit, formState: { errors  } } = useForm<CreateUsersValidationSchema>({
      resolver: zodResolver(createUserValidations),
  });

  const handleClose = () => {
    onClose();
  };

  function createUser(data: any) {
    console.log(data)
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle  sx={{ m: 0, p: 2 }}>Criar novo usuário</DialogTitle>

      <DialogContent dividers className="flex">
        <form className='flex flex-col gap-y-4 w-full' onSubmit={handleSubmit(createUser)}>
          <TextField  label="Nome" variant="outlined" {...register("name", { required: true })} />
          <TextField  label="Email" variant="outlined"  {...register("email", { required: true })} />
          <TextField  label="Nacionalidade" variant="outlined"  {...register("nat", { required: true })} />
          <TextField  label="Cidade" variant="outlined"  {...register("city", { required: true })} />

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
