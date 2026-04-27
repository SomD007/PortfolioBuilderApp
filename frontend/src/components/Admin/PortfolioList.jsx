import React from 'react';
import { Star } from 'lucide-react';

const PortfolioList = ({ portfolios, onToggleFeatured }) => (
    <div className="admin-card" style={{marginTop: '20px'}}>
        <h3>Portfolio Management</h3>
        <table className="admin-table">
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Slug</th>
                    <th>Theme</th>
                    <th>Featured</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {portfolios.map(p => (
                    <tr key={p._id}>
                        <td>{p.user?.username || 'Unknown'}</td>
                        <td>
                            <a href={`/preview/${p.slug}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                {p.slug}
                            </a>
                        </td>
                        <td>{p.settings?.theme}</td>
                        <td>
                            {p.isFeatured ? (
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            ) : (
                                <Star className="w-5 h-5 text-gray-300" />
                            )}
                        </td>
                        <td>
                            <button 
                                className={`btn-action ${p.isFeatured ? 'btn-ban' : 'btn-view'}`} 
                                onClick={() => onToggleFeatured(p._id)}
                            >
                                {p.isFeatured ? 'Unfeature' : 'Feature'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default PortfolioList;
