import { Spinner } from 'react-bootstrap';

const LoadingGrow: React.FC = () => {
    return (
        <div className="d-flex gap-3 justify-content-center">
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="secondary" />
        </div>
    );
};

export default LoadingGrow;
