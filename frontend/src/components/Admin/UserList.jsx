import React from 'react';

const UserList = ({ users, onDelete, onToggleStatus }) => (
    <div className="admin-card">
        <h3>User Management</h3>
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                    <tr key={u._id}>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>
                            <span className={`status-badge ${u.isActive !== false ? 'active' : 'banned'}`}>
                                {u.isActive !== false ? 'Active' : 'Deactivated'}
                            </span>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                            <button 
                                className={`btn-action ${u.isActive !== false ? 'btn-ban' : 'btn-view'}`} 
                                onClick={() => onToggleStatus(u._id)}
                            >
                                {u.isActive !== false ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="btn-action btn-delete" onClick={() => onDelete(u._id)} style={{marginLeft: '5px'}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default UserList;