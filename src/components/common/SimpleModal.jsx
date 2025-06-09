
const SimpleModal = ({ items, onSelect, onClose }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="absolute right-0 z-50 bg-white rounded-xl overflow-hidden shadow-lg">
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
        </>
    );
};

export default SimpleModal;