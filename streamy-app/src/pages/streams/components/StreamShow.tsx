import { useEffect, useRef } from 'react';
import flvjs from 'flv.js';

interface StreamShowProps {
    streamId: number;
}

const StreamShow: React.FC<StreamShowProps> = ({ streamId }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (flvjs.isSupported()) {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${streamId}.flv`,
            });
            flvPlayer.attachMediaElement(videoRef.current!);
            flvPlayer.load();

            return () => flvPlayer.destroy();
        }
    }, [streamId]);

    return <video ref={videoRef} className="w-100" controls />;
};

export default StreamShow;
