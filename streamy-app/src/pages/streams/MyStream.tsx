import LoadingGrow from 'components/LoadingGrow';
import { useFetch } from 'hooks';
import { useEffect } from 'react';
import { authUserSelector } from 'redux/authSlice/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchStream } from 'redux/streamsSlice/actions';
import { streamsStreamsSelector } from 'redux/streamsSlice/selector';
import { Stream } from 'types';
import StreamItem from './components/StreamItem';

const MyStream: React.FC = () => {
    const { isLoading, queryData } = useFetch<Stream[]>([]);
    const currentUser = useAppSelector(authUserSelector);
    const dispatch = useAppDispatch();
    const streams = Object.values(
        useAppSelector(streamsStreamsSelector)
    ).filter(stream => stream.userId === currentUser?.googleId) as Stream[];

    useEffect(() => {
        if (streams?.length > 0) {
            return;
        }

        queryData(
            {
                url: `streams`,
            },
            response => {
                dispatch(fetchStream(response));
            }
        );
    }, []);

    return (
        <div className="text-center my-5">
            {(() => {
                switch (true) {
                    case isLoading === true: {
                        return <LoadingGrow />;
                    }
                    case streams?.length === 0: {
                        return <p className="h3">There is no stream!</p>;
                    }
                    default:
                        return streams?.map(stream => (
                            <StreamItem key={stream.id} stream={stream} />
                        ));
                }
            })()}
        </div>
    );
};

export default MyStream;
