
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle  sx={{ m: 0, p: 2 }}>Editar usuário</DialogTitle>

      <DialogContent dividers className="flex flex-col gap-y-4 w-full">
        Está funcionalidade estará disponível em breve!
      </DialogContent>
      
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function EditUser({ children }: { children: React.ReactNode }) {
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