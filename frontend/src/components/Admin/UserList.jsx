import React from 'react';

const UserList = ({ users, onDelete }) => (
    <div className="admin-card">
        <h3>User Management</h3>
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                    <tr key={u._id}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                            <button className="btn-action btn-ban" onClick={() => onDelete(u._id)}>Ban</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default UserList;