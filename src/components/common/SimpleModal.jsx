
const SimpleModal = ({ items, onSelect, onClose }) => {
    return (
        <div className="bg-white flex items-center justify-center z-20">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            onSelect(item);
                            onClose();
                        }}
                        className="w-full text-nowrap text-left px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
                    >
                        {item}
                    </button>
                ))}
            </div>
            {/* Click outside to close */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />
        </div>
    );
}

export default SimpleModal;