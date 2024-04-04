

export function SideAddStationModal({ isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={ev => ev.stopPropagation}>
                {children}
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}