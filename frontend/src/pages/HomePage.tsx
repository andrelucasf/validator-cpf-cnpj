import React, { useState } from "react";
import { Grid2, Typography } from "@mui/material";
import CpfCnpjTable from "../components/table/CpfCnpjTable";
import CpfCnpjForm from "../components/form/CpfCnpjForm";

const HomePage: React.FC = () => {
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload(!reload);
  };

  return (
    <Grid2
      container
      spacing={3}
      direction="column"
      sx={{
        padding: 3,
        backgroundColor: "#4582ec",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        marginTop={7}
        marginBottom={2}
        variant="h4"
        color="#f0f0f0"
        fontSize={40}
        fontWeight={600}
      >
        Validação e Gerenciamento de CPF/CNPJ
      </Typography>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{ padding: 1 }}>
        <CpfCnpjForm onAdd={triggerReload} />
      </Grid2>
      <Grid2 sx={{ padding: 1, width: "100%" }}>
        <CpfCnpjTable reload={reload} />
      </Grid2>
    </Grid2>
  );
};

export default HomePage;
