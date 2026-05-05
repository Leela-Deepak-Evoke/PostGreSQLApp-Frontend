import { useEffect, useState } from "react";
import Modal from "./Modal";
import type { User } from "../models/User";

type Props = {
  users: User[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onSave: (u: User) => void;
};

const TableView: React.FC<Props> = ({
  users, onDelete, onToggle, onSave
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      setSelected(e.detail);
      setModalOpen(true);
    };
    window.addEventListener("open-modal", handler);
    return () => window.removeEventListener("open-modal", handler);
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Job</th>
              <th className="p-3">Rate</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3">{u.job}</td>
                <td className="p-3 font-semibold text-blue-600">₹{u.rate}</td>

                <td className="p-3">
                  <span
                    onClick={() => onToggle(u.id!)}
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      u.isactive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.isactive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => { setSelected(u); setModalOpen(true); }}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(u.id!)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div key={u.id} className="bg-white shadow rounded-xl p-4 space-y-2">
            <div className="font-semibold text-lg">{u.name}</div>
            <div className="text-gray-500">{u.email}</div>
            <div>{u.job}</div>
            <div className="font-medium text-blue-600">₹{u.rate}</div>

            <span
              onClick={() => onToggle(u.id!)}
              className={`inline-block px-3 py-1 text-xs rounded-full ${
                u.isactive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {u.isactive ? "Active" : "Inactive"}
            </span>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { setSelected(u); setModalOpen(true); }}
                className="flex-1 bg-yellow-400 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(u.id!)}
                className="flex-1 bg-red-500 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        initialData={selected}
        onClose={() => setModalOpen(false)}
        onSave={(u) => {
          onSave(u);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default TableView;