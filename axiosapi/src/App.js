import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);

            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
            setLoading(false);
        }
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
    };

    const addUsers = async (e) => {
        e.preventDefault();
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
            name: name,
            email: email,
        });
        setUsers([response.data, ...users]);
        setName('');
        setEmail('');
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };



    return (
        <>
            <h1>Get & Delete API from AXIOS</h1>
            <div className="App">
                <form onSubmit={addUsers}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChange}
                    />
                    <button type="submit">Add</button>
                </form>

                {loading ? (
                    <button type="button" className="bg-indigo-300 ... ml-9" disabled>
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">

                        </svg>
                        Processing...
                    </button>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleDelete(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
