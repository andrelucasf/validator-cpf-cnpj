import React, { useEffect, useState } from "react";
import { Container, Box, Alert, Collapse } from "@mui/material";
import DocumentTable from "./DocumentTable";
import ActionButtons from "./ActionButtons";
import {
  deleteDocuments,
  fetchDocuments,
  updateBlocklist,
} from "../../services/apiService";

interface CpfCnpjTableProps {
  reload: boolean;
}

const CpfCnpjTable: React.FC<CpfCnpjTableProps> = ({ reload }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectionModel, setSelectionModel] = useState<string[]>([]);

  const loadDocuments = async () => {
    try {
      const data = await fetchDocuments();
      setDocuments(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar documentos. Tente novamente.");
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [reload]);

  const handleBlocklistUpdate = async (blocklist: boolean) => {
    try {
      await updateBlocklist(selectionModel, blocklist);
      loadDocuments();
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar bloqueio. Tente novamente.");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteDocuments(selectionModel);
      loadDocuments();
    } catch (err: any) {
      setError(err.message || "Erro ao deletar documentos. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <ActionButtons
          selectionModel={selectionModel}
          onBlock={() => handleBlocklistUpdate(true)}
          onUnblock={() => handleBlocklistUpdate(false)}
          onDelete={handleDeleteSelected}
        />
      </Box>
      <Alert severity="info" sx={{ marginBottom: 2 }}>
        Para liberar as ações dos botões, selecione uma ou mais linhas na
        tabela. E para filtrar e ordenar os dados, clique nos cabeçalhos das
        colunas da tabela.
      </Alert>
      <DocumentTable
        documents={documents}
        selectionModel={selectionModel}
        setSelectionModel={setSelectionModel}
      />
    </Container>
  );
};

export default CpfCnpjTable;
