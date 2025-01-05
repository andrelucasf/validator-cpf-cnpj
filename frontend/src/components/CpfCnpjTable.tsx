import React, { useEffect, useState } from "react";
import { Box, Button, Alert, Collapse, Container, Grid2 } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import axios from "axios";
import { Document } from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

interface CpfCnpjTableProps {
  reload: boolean;
}

const CpfCnpjTable: React.FC<CpfCnpjTableProps> = ({ reload }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    []
  );

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cpf-cnpj");
      setDocuments(response.data);
      setError(null);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Erro ao carregar documentos. Tente novamente."
      );
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [reload]);

  const handleBlocklistUpdate = async (blocklist: boolean) => {
    try {
      await Promise.all(
        selectionModel.map((doc) =>
          axios.patch(`http://localhost:3000/cpf-cnpj/blocklist/${doc}`, {
            blocklist,
          })
        )
      );
      fetchDocuments();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Erro ao atualizar bloqueio. Tente novamente."
      );
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectionModel.map((doc) =>
          axios.delete(`http://localhost:3000/cpf-cnpj/${doc}`)
        )
      );
      fetchDocuments();
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Erro ao deletar documentos. Tente novamente."
      );
    }
  };

  const columns: GridColDef[] = [
    { field: "document", headerName: "CPF/CNPJ adicionados", flex: 1 },
    {
      field: "blocklist",
      headerName: "Blocklist",
      flex: 1,
      type: "boolean",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleBlocklistUpdate(true)}
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
              onClick={() => handleBlocklistUpdate(false)}
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
              onClick={handleDeleteSelected}
              disabled={selectionModel.length === 0}
              sx={{ minWidth: 150 }}
              startIcon={<DeleteIcon />}
            >
              Deletar Selecionados
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      <Alert severity="info" sx={{ marginBottom: 2 }}>
        Para liberar as ações dos botões, selecione uma ou mais linhas na
        tabela. E para filtrar e ordenar os dados, clique nos cabeçalhos das
        colunas da tabela.
      </Alert>
      <Box sx={{ height: "70vh", width: "100%", background: "#ffffff" }}>
        <DataGrid
          rows={documents}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.document}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
        />
      </Box>
    </Container>
  );
};

export default CpfCnpjTable;
