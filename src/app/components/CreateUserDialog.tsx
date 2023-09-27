import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

interface DialogProps {
    open: boolean;
    onClose: () => void;
}

function SimpleDialog(props: DialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle  sx={{ m: 0, p: 2 }}>Criar novo usuário</DialogTitle>

      <DialogContent dividers className="flex flex-col gap-y-4 w-full">
        <TextField  label="Nome" variant="outlined" />
        <TextField  label="Email" variant="outlined" />
        <TextField  label="Gênero" variant="outlined" />

        <Button className='mt-6 py-4 normal-case bg-alleasy-blue/90 hover:bg-blue-600 text-white rounded-md'>Cadastrar</Button>
      </DialogContent>
      
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function CreateUserDialog({ children }: { children: React.ReactNode }) {
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
