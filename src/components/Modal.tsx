import { useEffect, useState } from "react";
import type { User } from "../models/User";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (u: User) => void;
    initialData?: User | null;
};

const emptyUser: User = {
    id: 0,
    name: "",
    email: "",
    job: "",
    rate: 0,
    isactive: true,
};

const Modal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData }) => {
    const [form, setForm] = useState<User>(emptyUser);

    useEffect(() => {
        setForm(initialData || emptyUser);
    }, [initialData]);

    if (!isOpen) return null;

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const submit = (e: any) => {
        console.log("Form data: ",form);
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-scaleIn">

                <h2 className="text-xl font-bold mb-4">
                    {initialData ? "Edit User" : "Add User"}
                </h2>

                <form onSubmit={submit} className="space-y-4">

                    <input name="name" value={form.name} onChange={handleChange}
                        placeholder="Name"
                        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500" />

                    <input name="email" value={form.email} onChange={handleChange}
                        placeholder="Email"
                        className="w-full border px-3 py-2 rounded-lg" />

                    <input name="job" value={form.job} onChange={handleChange}
                        placeholder="Job"
                        className="w-full border px-3 py-2 rounded-lg" />

                    <input name="rate" type="number" value={form.rate}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg" />

                    <label className="flex gap-2">
                        <input type="checkbox" name="isactive"
                            checked={form.isactive} onChange={handleChange} />
                        Active
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg">
                            Cancel
                        </button>

                        <button type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Modal;