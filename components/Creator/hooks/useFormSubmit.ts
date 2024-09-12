import React, { useState, useEffect } from 'react';
import { IVideoData } from '../types/IVideoData';
import { validateUrl } from './utils';
import { useNewItems } from '../../Viewer/hooks/useNewItems';

const useFormSubmit = (url: string, tags: string, focussedVideo: IVideoData | null, isPresent: boolean) => {
    const [isSubmittable, setIsSubmittable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { invalidateNewItemsCache } = useNewItems();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!url || !validateUrl(url)) {
            return;
        }

        setIsLoading(true);

        try {
            await fetch('/api/creator/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...focussedVideo,
                    tags,
                    url,
                }),
            });

            invalidateNewItemsCache();
        } catch (error) {
            console.error('Failed to submit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsSubmittable(!!(url && tags && !isPresent));
    }, [url, tags, isPresent]);

    return {
        isSubmittable,
        isLoading,
        handleSubmit,
    };
};

export default useFormSubmit;
