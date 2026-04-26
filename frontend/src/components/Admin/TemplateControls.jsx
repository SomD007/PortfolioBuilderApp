import React from 'react';
import { Settings, Lock, Unlock, AlertCircle } from 'lucide-react';

const TemplateControls = ({ templates, onUpdateTemplate }) => (
    <div className="admin-card" style={{marginTop: '20px'}}>
        <h3>Template Management</h3>
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Display Name</th>
                    <th>Slug</th>
                    <th>Premium</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {templates.map(t => (
                    <tr key={t._id}>
                        <td>{t.displayName}</td>
                        <td><code>{t.name}</code></td>
                        <td>
                            <input 
                                type="checkbox" 
                                checked={t.isPremium} 
                                onChange={(e) => onUpdateTemplate(t._id, { isPremium: e.target.checked })}
                            />
                        </td>
                        <td>
                            <span className={`status-badge ${t.isAvailable ? 'active' : 'banned'}`}>
                                {t.isAvailable ? 'Available' : 'Maintenance'}
                            </span>
                        </td>
                        <td>
                            <button 
                                className={`btn-action ${t.isAvailable ? 'btn-ban' : 'btn-view'}`} 
                                onClick={() => onUpdateTemplate(t._id, { isAvailable: !t.isAvailable })}
                            >
                                {t.isAvailable ? 'Set Maintenance' : 'Activate'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TemplateControls;
