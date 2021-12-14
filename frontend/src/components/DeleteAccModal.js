import React from 'react'
import '../style/profile.css'


export default function DeleteAccModal({ open, children, onClose }) {
    if (!open) return null
    return (
        <div>
            <div className="overlay" />
            <div className="delete-account-container">{children}
                <button onClick={onClose} className="btn-answer no">Non</button>
            </div>

        </div>
    )
}
