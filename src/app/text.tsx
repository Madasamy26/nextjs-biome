import { useState } from "react"
import DataGrid, { Column, RenderCellProps } from 'react-data-grid';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function CrudApp() {
  const [users, setUsers] = useState<User[]>([])
  const [form, setForm] = useState({ name: "", email: "" })
  const [editingId, setEditingId] = useState<number | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingId !== null) {
      setUsers(users.map(user => user.id === editingId ? { ...user, ...form } : user))
      setEditingId(null)
    } else {
      setUsers([...users, { id: Date.now(), ...form }])
    }
    setForm({ name: "", email: "" })
  }

  function handleEdit(user: User) {
    setForm({ name: user.name, email: user.email })
    setEditingId(user.id)
  }

  function handleDelete(id: number) {
    setUsers(users.filter(user => user.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setForm({ name: "", email: "" })
    }
  }

  const columns: readonly Column<User>[] = [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    {
      key: 'actions',
      name: 'Actions',
      renderCell: (props: RenderCellProps<User>) => {
        const { row } = props;
        return (
          <div>
            <button onClick={() => handleEdit(row)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2">
              Edit
            </button>
            <button onClick={() => handleDelete(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simple CRUD App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
            />
          </label>
        </div>
        <div className="mb-4">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {editingId !== null ? "Update" : "Add"}
        </button>
      </form>
      <DataGrid columns={columns} rows={users} />
    </div>
  )
}
