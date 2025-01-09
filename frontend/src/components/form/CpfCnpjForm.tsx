import React, { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Collapse,
  Container,
  Grid2,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { addDocument, consultDocument } from "../../services/apiService";

interface Props {
  onAdd: () => void;
}

const CpfCnpjForm: React.FC<Props> = ({ onAdd }) => {
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [consultResult, setConsultResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!document) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await addDocument(document);

      setDocument("");
      setSuccess("Documento adicionado com sucesso!");
      onAdd();
    } catch (error: any) {
      setError(
        error.message || "Erro ao adicionar documento. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConsult = async () => {
    if (!document) return;
    setLoading(true);
    setError(null);
    setConsultResult(null);
    try {
      const response = await consultDocument(document);

      if (response.isValid) {
        setConsultResult(`Documento válido!`);
      } else {
        setError(`Documento inválido!`);
      }
    } catch (error: any) {
      setError(
        error.message || "Erro ao consultar documento. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <TextField
        label="CPF/CNPJ"
        variant="outlined"
        fullWidth
        value={document}
        onChange={(e) => setDocument(e.target.value)}
      />
      <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
        <Grid2 size={{ xs: 6 }}>
          <Button
            variant="contained"
            color="success"
            sx={{ width: "100%", backgroundColor: "#02B875" }}
            onClick={handleConsult}
            disabled={loading}
            startIcon={<SearchIcon />}
          >
            {loading ? "Validando..." : "Validar"}
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "100%" }}
            onClick={handleSubmit}
            disabled={loading}
            startIcon={<AddIcon />}
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </Grid2>
      </Grid2>

      <Collapse in={!!error}>
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      </Collapse>

      <Collapse in={!!success}>
        <Alert severity="success" sx={{ marginTop: 2 }}>
          {success}
        </Alert>
      </Collapse>

      {consultResult && (
        <Collapse in={true}>
          <Alert severity="success" sx={{ marginTop: 2 }}>
            {consultResult}
          </Alert>
        </Collapse>
      )}
    </Container>
  );
};

export default CpfCnpjForm;
