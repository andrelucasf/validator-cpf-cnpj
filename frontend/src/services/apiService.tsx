import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const addDocument = async (document: string) => {
  try {
    const response = await api.post("/cpf-cnpj", { document });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Erro ao adicionar documento. Tente novamente."
    );
  }
};

export const consultDocument = async (document: string) => {
  try {
    const response = await api.get(`/cpf-cnpj/consult/${document}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Erro ao consultar documento. Tente novamente."
    );
  }
};

export const fetchDocuments = async () => {
  const response = await api.get("/cpf-cnpj");
  return response.data;
};

export const updateBlocklist = async (
  documents: string[],
  blocklist: boolean
) => {
  await Promise.all(
    documents.map((doc) =>
      api.patch(`/cpf-cnpj/blocklist/${doc}`, {
        blocklist,
      })
    )
  );
};

export const deleteDocuments = async (documents: string[]) => {
  await Promise.all(documents.map((doc) => api.delete(`/cpf-cnpj/${doc}`)));
};
