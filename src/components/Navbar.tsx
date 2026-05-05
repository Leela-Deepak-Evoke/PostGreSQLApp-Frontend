import { useState } from "react";

type Props = {
    onAdd: () => void;
    onSearch: (val: string) => void;
};

const Navbar: React.FC<Props> = ({ onAdd, onSearch }) => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">

                <div className="font-bold text-xl tracking-wide">CRUDApp</div>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
                    <input
                        placeholder="Search users..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={onAdd}
                    className="hidden md:block bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition cursor-pointer shadow"
                >
                    + Add User
                </button>

                {/* Mobile */}
                <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-800">
                    <input
                        placeholder="Search..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700"
                    />
                    <button
                        onClick={onAdd}
                        className="w-full bg-green-500 py-2 rounded-lg"
                    >
                        + Add User
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;