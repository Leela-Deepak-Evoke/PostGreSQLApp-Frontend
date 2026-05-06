import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Navbar from "./components/Navbar";
import TableView from "./components/TableView";
import type { User } from "./models/User";

// ✅ Load from .env file
const API_URL = import.meta.env.VITE_BACKEND_URL;

// ---------------- API METHODS ----------------

// GET Clients
const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_URL);
  return res.data.data || res.data;
};

// CREATE Client
const createUser = async (user: Partial<User>) => {
  const res = await axios.post(`${API_URL}/client`, user);
  return res.data.data;
};

// UPDATE Client
const updateUser = async (user: User) => {
  const res = await axios.put(`${API_URL}/client/${user.id}`, user);
  return res.data.data;
};

// DELETE Client
const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/client/${id}`);
};

// ------------------------------------------------

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleCreate = () => {
    window.dispatchEvent(new CustomEvent("open-modal", { detail: null }));
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const toggleStatus = (id: number) => {
    const selected = users.find((u) => u.id === id);
    if (!selected) return;

    updateMutation.mutate({
      ...selected,
      isactive: !selected.isactive,
    });
  };

  const handleSave = (user: User) => {
    if (user.id) {
      updateMutation.mutate(user);
    } else {
      createMutation.mutate(user);
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((u: User) =>
        `${u.name} ${u.email} ${u.job}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) return <h2>Loading users...</h2>;
  if (isError) return <h2>Failed to load users</h2>;

  return (
    <>
      <Navbar onAdd={handleCreate} onSearch={setSearchTerm} />

      <TableView
        users={filteredUsers}
        onDelete={handleDelete}
        onToggle={toggleStatus}
        onSave={handleSave}
      />
    </>
  );
}

export default App;