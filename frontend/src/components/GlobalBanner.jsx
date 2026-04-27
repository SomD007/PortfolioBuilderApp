import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Info, AlertTriangle, Hammer, CheckCircle } from 'lucide-react';

const GlobalBanner = () => {
    const [notice, setNotice] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                // Adjust base URL if needed, or use a proxy/relative path
                const res = await axios.get('http://localhost:5000/api/notices/active');
                if (res.data) {
                    setNotice(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch global notice:", err);
            }
        };

        fetchNotice();
    }, []);

    if (!notice || !isVisible) return null;

    const styles = {
        info: "bg-blue-600 text-white",
        warning: "bg-amber-500 text-black",
        maintenance: "bg-slate-800 text-white",
        success: "bg-emerald-600 text-white"
    };

    const icons = {
        info: <Info className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
        maintenance: <Hammer className="w-5 h-5" />,
        success: <CheckCircle className="w-5 h-5" />
    };

    return (
        <div className={`${styles[notice.type] || styles.info} relative flex items-center justify-center px-4 py-3 transition-all duration-500 ease-in-out`}>
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
                <span className="flex-shrink-0">
                    {icons[notice.type] || icons.info}
                </span>
                <p className="text-sm md:text-base font-medium text-center">
                    {notice.message}
                </p>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute right-4 p-1 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Close banner"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

export default GlobalBanner;
