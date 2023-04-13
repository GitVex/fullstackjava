import React from "react";

interface ModalProps {
    isOpen: boolean;
    isClosed: () => void;
    children: React.ReactNode;
}

function Modal({ isOpen, isClosed, children }: ModalProps) {
    return (
        <div>
            <p className="text-4xl">&times;</p>
        </div>
    );
}

export default Modal;
