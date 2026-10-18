import { useState, useEffect } from 'react'
import axios from 'axios'
import type { FormEvent } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

type Employee = {
  id: number
  name: string
  email: string
  role: string
}

function App() {

const [employees, setEmployees] = useState<Employee[]>([])

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [role, setRole] = useState('')
const [searchTerm, setSearchTerm] = useState('')

const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
)

const fetchEmployees = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/employees`
    )
    setEmployees(response.data)
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

const [editingId, setEditingId] = useState<number | null>(null)
const handleEdit = (employee: Employee) => {
  setEditingId(employee.id)
  setName(employee.name)
  setEmail(employee.email)
  setRole(employee.role)
}

const handleDelete = async (id: number) => {
  if (!window.confirm('Are you sure you want to delete this employee?')) {
    return
  }

  try {
    await axios.delete(`${API_URL}/employees/${id}`)

    await fetchEmployees()

    if (editingId === id) {
      setEditingId(null)
      setName('')
      setEmail('')
      setRole('')
    }
  } catch (error) {
    console.error('Error deleting employee:', error)
    alert('Failed to delete employee')
  }
}
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  // try {
  //   await axios.post('http://localhost:5000/employees', {
  //     name,
  //     email,
  //     role
  //   })

  //   await fetchEmployees()

  //   setName('')
  //   setEmail('')
  //   setRole('')
  // } catch (error) {
  //   console.error('Error adding employee:', error)
  // }

  try {
  if (editingId !== null) {
    await axios.put(
      `${API_URL}/employees/${editingId}`,
      { name, email, role }
    )
  } else {
    await axios.post(`${API_URL}/employees`, {
      name,
      email,
      role
    })
  }

  await fetchEmployees()

  setName('')
  setEmail('')
  setRole('')
  setEditingId(null)
} catch (error) {
  console.error('Error saving employee:', error)
}
}

// useEffect(() => {
//   axios.get('http://localhost:5000/employees')
//     .then((response) => {
//       setEmployees(response.data)
//     })
//     .catch((error) => {
//       console.error('Error fetching employees:', error)
//     })
// }, [])

useEffect(() => {
  fetchEmployees()
}, [])
  return (
    <main>
      <h1>Employee Directory</h1>
      <p>Manage your employees</p>

      <form onSubmit={handleSubmit}>

        <div className="search-box">
  <input
    type="text"
    placeholder="Search employees by name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <span>{filteredEmployees.length} employees</span>
</div>
  <input
    type="text"
    placeholder="Employee Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

<input
    type="email"
    placeholder="Employee Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <input
    type="text"
    placeholder="Employee Role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
  />

  <button type="submit">{editingId !== null ? 'Update Employee' : 'Add Employee'}</button>
</form>
<div className="table-wrapper">
      <table>
  <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
    <th>Actions</th>
  </tr>
</thead>
  <tbody>
    {filteredEmployees.map((employee) => (
  <tr key={employee.id}>
    <td>{employee.id}</td>
    <td>{employee.name}</td>
    
    <td>{employee.email}</td>
    
    <td>{employee.role}</td>
    <td>
  <button className="edit-button" type="button"  onClick={() => handleEdit(employee)}>Edit</button>
  <button className="delete-button" type="button" onClick={() => handleDelete(employee.id)}>Delete</button>
</td>
  </tr>
))}
  </tbody>
</table>
</div>
    </main>
  )
}

export default App