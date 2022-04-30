import { useFetch } from 'hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { streamsStreamsSelector } from 'redux/streamsSlice/selector';
import { Stream } from 'types';
import StreamShow from './components/StreamShow';

const StreamView: React.FC = () => {
    const { id } = useParams();
    const currentStream = useAppSelector(streamsStreamsSelector)[id as string];
    const { isLoading, data, queryData } = useFetch<Stream>();

    const streamDetail = currentStream ?? data;

    useEffect(() => {
        if (currentStream) {
            return;
        }

        queryData({
            url: `streams/${id}`,
        });
    }, []);

    return (
        <div className="my-5">
            {streamDetail && (
                <>
                    <StreamShow streamId={streamDetail.id} />
                    <div className="mt-3">
                        <h3>{streamDetail.title}</h3>
                        <p>{streamDetail.descriptions}</p>
                    </div>
                </>
            )}
            {!isLoading && !streamDetail && (
                <p className="h5 text-center">
                    There is no livestream with id: {id}
                </p>
            )}
        </div>
    );
};

export default StreamView;
