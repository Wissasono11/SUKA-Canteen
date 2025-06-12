import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Modal from "@/Components/ui/Modal";
import { Input } from "@/Components/ui/input";
import { usePage } from "@inertiajs/react";

export default function DashboardMenu({ auth, canteen }) {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [form, setForm] = useState({ name: "", price: "", category: "madang", image: null });
    const [errorMsg, setErrorMsg] = useState("");

    // Ambil user dan kantin dari props atau usePage
    const page = usePage();
    const user = auth?.user || page.props?.auth?.user;
    const canteenData = canteen || page.props?.canteen;

    const fetchMenus = () => {
        setLoading(true);
        fetch("/api/menu-items", { headers: { Accept: "application/json" }, credentials: 'include' })
            .then(async res => {
                if (res.status === 401) {
                    setMenus([]);
                    console.error("Unauthorized: Anda belum login atau session habis.");
                    // Redirect ke halaman login
                    window.location.href = '/login';
                    return;
                }
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMenus(data);
                } else {
                    setMenus([]);
                    console.error("API /api/menu-items response:", data);
                }
            })
            .catch((err) => {
                setMenus([]);
                console.error("API /api/menu-items error:", err);
            })
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        // Ambil CSRF cookie dari backend sebelum request API
        fetch("/sanctum/csrf-cookie", { credentials: "include" })
            .then(() => {
                fetchMenus();
            })
            .catch((err) => {
                console.error("Gagal mengambil CSRF cookie:", err);
            });
    }, []);

    const handleAddMenu = () => {
        setForm({ name: "", price: "", category: "madang", image: null });
        setShowAddModal(true);
    };
    const handleEditMenu = (menu) => {
        setSelectedMenu(menu);
        setForm({ name: menu.name, price: menu.price, category: menu.category, image: null });
        setShowEditModal(true);
    };
    const handleDeleteMenu = (menu) => {
        setSelectedMenu(menu);
        setShowDeleteModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Menu Kantin</h3>
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddMenu}>Tambah Menu</Button>
            </div>
            {loading ? <div>Loading...</div> : (
                <div className="grid md:grid-cols-3 gap-4">
                    {menus.length === 0 ? (
                        <div className="text-gray-500">Belum ada menu.</div>
                    ) : (
                        menus.map(item => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <img src={item.image_url || "/placeholder.svg?height=150&width=300&text=Menu"} alt={item.name} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-sm text-gray-500">Kategori: {item.category?.name || '-'}</div>
                                        <div className="text-sm text-gray-500">Rp{item.price}</div>
                                        <div className="flex justify-end space-x-2 mt-2">
                                            <Button variant="outline" size="sm" onClick={() => handleEditMenu(item)}>Edit</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDeleteMenu(item)}>Hapus</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
            {/* Modal Tambah Menu */}
            <Modal open={showAddModal} onClose={() => { setShowAddModal(false); setErrorMsg(""); }}>
                <h2 className="text-lg font-bold mb-4">Tambah Menu</h2>
                {errorMsg && (
                    <div className="mb-2 text-red-600 text-sm font-semibold">{errorMsg}</div>
                )}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setErrorMsg("");
                        const formData = new FormData();
                        formData.append("name", form.name);
                        formData.append("price", form.price);
                        formData.append("category", form.category);
                        if (form.image) formData.append("image", form.image);
                        try {
                            const res = await fetch("/api/menu-items", { method: "POST", body: formData, credentials: 'include' });
                            if (!res.ok) {
                                const data = await res.json();
                                setErrorMsg(data?.error || "Gagal menambah menu. Cek data dan koneksi Anda.");
                                return;
                            }
                            setShowAddModal(false);
                            fetchMenus();
                        } catch (err) {
                            setErrorMsg("Terjadi kesalahan jaringan atau server.");
                        }
                    }}
                >
                    <Input className="mb-2" placeholder="Nama Menu" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <Input className="mb-2" placeholder="Harga Menu" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                    <select className="mb-2 w-full border rounded p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                        <option value="madang">Madang</option>
                        <option value="sarapan">Sarapan</option>
                        <option value="snack">Snack</option>
                        <option value="minuman">Minuman</option>
                    </select>
                    <Input className="mb-4" type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => { setShowAddModal(false); setErrorMsg(""); }}>Batal</Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan</Button>
                    </div>
                </form>
            </Modal>
            {/* Modal Edit Menu */}
            <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
                <h2 className="text-lg font-bold mb-4">Edit Menu</h2>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append("name", form.name);
                        formData.append("price", form.price);
                        formData.append("category", form.category);
                        if (form.image) formData.append("image", form.image);
                        await fetch(`/api/menu-items/${selectedMenu?.id}`, { method: "POST", headers: { "X-HTTP-Method-Override": "PUT" }, body: formData, credentials: 'include' });
                        setShowEditModal(false);
                        fetchMenus();
                    }}
                >
                    <Input className="mb-2" placeholder="Nama Menu" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <Input className="mb-2" placeholder="Harga Menu" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                    <select className="mb-2 w-full border rounded p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                        <option value="madang">Madang</option>
                        <option value="sarapan">Sarapan</option>
                        <option value="snack">Snack</option>
                        <option value="minuman">Minuman</option>
                    </select>
                    <Input className="mb-4" type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} />
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>Batal</Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">Simpan</Button>
                    </div>
                </form>
            </Modal>
            {/* Modal Hapus Menu */}
            <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
                <p className="mb-4">Apakah anda akan menghapus menu ini?</p>
                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)}>Batal</Button>
                    <Button type="button" variant="destructive" onClick={async () => {
                        await fetch(`/api/menu-items/${selectedMenu?.id}`, { method: "DELETE", credentials: 'include' });
                        setShowDeleteModal(false);
                        fetchMenus();
                    }}>Hapus</Button>
                </div>
            </Modal>
        </div>
    );
}
