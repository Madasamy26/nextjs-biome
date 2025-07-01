import { useState } from "react"

interface User {
  id: number;
  name: string;
  email: string;
}

export default function CrudApp() {
  const [users, setUsers] = useState<User[]>([])
  const [form, setForm] = useState({ name: "", email: "" })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [name,setName] = useState("asd")

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

  return (
    <div>
      <h1>Simple CRUD App</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <div style={{ marginTop: 10 }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ marginLeft: 8 }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: 16 }}>
          {editingId !== null ? "Update" : "Add"}
        </button>
      </form>
      <ul style={{ marginTop: 30 }}>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: 10 }}>
            <span>{user.name} ({user.email}) </span>
            <button onClick={() => handleEdit(user)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}