import StreamForm from './components/StreamForm';

const NewStream: React.FC = () => {
    return (
        <div className="mx-auto my-4" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4">Create new stream</h2>
            <StreamForm />
        </div>
    );
};

export default NewStream;
