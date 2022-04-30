import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

interface CustomModalProps {
    title?: string;
    show: boolean;
    handleClose: () => void;
    children: ReactNode;
    handleOk: () => void;
    closeText?: string;
    okText?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
    show,
    handleClose,
    title,
    children,
    handleOk,
    closeText,
    okText,
}) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title || 'Custom Modal'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{children}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {closeText || 'Cancel'}
                        </Button>
                        <Button variant="primary" onClick={handleOk}>
                            {okText || 'Save'}
                        </Button>
                    </Modal.Footer>
                </Modal>,
                document.body
            )}
        </>
    );
};

export default CustomModal;
