import React from "react";
import { Button, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

interface ActionButtonsProps {
  selectionModel: string[];
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  selectionModel,
  onBlock,
  onUnblock,
  onDelete,
}) => (
  <Grid2 container spacing={2} justifyContent="center">
    <Grid2>
      <Button
        variant="contained"
        color="warning"
        onClick={onBlock}
        disabled={selectionModel.length === 0}
        sx={{ minWidth: 150 }}
        startIcon={<LockIcon />}
      >
        Bloquear Selecionados
      </Button>
    </Grid2>
    <Grid2>
      <Button
        variant="contained"
        color="success"
        onClick={onUnblock}
        disabled={selectionModel.length === 0}
        sx={{ minWidth: 150 }}
        startIcon={<LockOpenIcon />}
      >
        Desbloquear Selecionados
      </Button>
    </Grid2>
    <Grid2>
      <Button
        variant="contained"
        color="error"
        onClick={onDelete}
        disabled={selectionModel.length === 0}
        sx={{ minWidth: 150 }}
        startIcon={<DeleteIcon />}
      >
        Deletar Selecionados
      </Button>
    </Grid2>
  </Grid2>
);

export default ActionButtons;
