import { useFetch } from 'hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stream } from 'types';
import StreamForm from './components/StreamForm';
import { useAppSelector } from 'redux/hooks';
import { streamsStreamsSelector } from 'redux/streamsSlice/selector';

const StreamEdit: React.FC = () => {
    const { id } = useParams();
    const currentStream = useAppSelector(streamsStreamsSelector)[id as string];
    const { isLoading, data, queryData } = useFetch<Stream>();

    const formInitial = currentStream ?? data;

    useEffect(() => {
        if (currentStream) {
            return;
        }

        queryData({
            url: `streams/${id}`,
        });
    }, []);

    return (
        <div className="mx-auto my-4" style={{ maxWidth: '500px' }}>
            {formInitial && (
                <>
                    <h2 className="mb-4">Edit livestream: {id}</h2>
                    <StreamForm
                        formInitial={formInitial}
                        initialLoading={isLoading}
                    />
                </>
            )}
            {!isLoading && !formInitial && (
                <p className="h5 text-center">
                    There is no livestream with id: {id}
                </p>
            )}
        </div>
    );
};

export default StreamEdit;
