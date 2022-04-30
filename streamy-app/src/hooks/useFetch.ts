import { API_URL } from 'config';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FetchOptions } from 'types';

export const useFetch = <T extends any>(initialData?: T) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<T | null>(initialData || null);

    const controller = new AbortController();

    const queryData = async (
        { url, config }: FetchOptions,
        cbSuccess?: (res: T) => void
    ) => {
        try {
            setIsLoading(true);
            setError('');

            const response = await fetch(`${API_URL}/${url}`, {
                ...config,
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = (await response.json()) as T;

            if (!data) {
                throw new Error('Unknow Error!');
            }

            setData(data);
            cbSuccess?.(data);
        } catch (error) {
            const errorMsg =
                error instanceof Error
                    ? error.message
                    : 'Something went wrong!';

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        return () => controller.abort();
    }, []);

    return { isLoading, error, data, queryData };
};
