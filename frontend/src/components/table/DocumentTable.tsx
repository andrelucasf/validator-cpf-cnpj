import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DocumentTableProps {
  documents: Document[];
  selectionModel: string[];
  setSelectionModel: (selection: string[]) => void;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  selectionModel,
  setSelectionModel,
}) => {
  const columns: GridColDef[] = [
    { field: "document", headerName: "CPF/CNPJ", flex: 1 },
    {
      field: "blocklist",
      headerName: "Bloqueado?",
      flex: 1,
      renderCell: (params) => (params.value ? "Sim" : "Não"),
    },
    {
      field: "created_at",
      headerName: "Data Criação",
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      field: "update_at",
      headerName: "Última Atualização",
      flex: 1,
      renderCell: (params) =>
        new Date(params.value).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  return (
    <Box sx={{ height: "70vh", width: "100%", background: "#ffffff" }}>
      <DataGrid
        rows={documents}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row.document}
        onRowSelectionModelChange={(newSelectionModel) =>
          setSelectionModel(newSelectionModel as string[])
        }
      />
    </Box>
  );
};

export default DocumentTable;
