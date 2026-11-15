import './style.scss';

import { useEffect, useState } from 'react';
import { Form } from 'react-router';

import FallbackImage from '@/shared/ui/FallbackImage/FallbackImage';
import FallbackVideo from '@/shared/ui/FallbackVideo/FallbackVideo';
import Field from '@/shared/ui/Field/Field';

export default function AddDraftPage() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (videoUrl) URL.revokeObjectURL(videoUrl);
            if (imageUrl) URL.revokeObjectURL(imageUrl);
        };
    }, [videoUrl, imageUrl])

    function handleVideoChange(event: React.ChangeEvent<HTMLInputElement>) {
        const video = event.currentTarget.files?.[0];
        if (!video) return;

        setVideoUrl(URL.createObjectURL(video));
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {

        const image = event.currentTarget.files?.[0];
        if (!image) return;

        setImageUrl(URL.createObjectURL(image));
    }

    return (<>
        <Form
            method="post"
            className="form"
            encType="multipart/form-data"
        >
            <div className="form__media-wrapper">
                <Field
                    className="form__video-field"
                    label="Видео"
                    type="file"
                    name="video"
                    id="isotope-video"
                    accept="video/*"
                    required={true}
                    onChange={handleVideoChange}
                />

                <FallbackVideo
                    src={videoUrl}
                    fallbackSrc="/assets/isotope.mp4"
                    className="form__media-preview"
                    controls={true}
                    muted={true}
                />
            </div>

            <div className="form__media-wrapper">
                <Field
                    className="form__image-field"
                    label="Фото"
                    type="file"
                    name="image"
                    id="isotope-image"
                    accept=".png, .jpg, .jpeg"
                    required={true}
                    onChange={handleImageChange}
                />

                <FallbackImage
                    src={imageUrl}
                    fallbackSrc="/assets/isotope.png"
                    className="form__media-preview"
                />
            </div>

            <Field
                className="form__name-field"
                label="Название изотопа"
                type="text"
                name="name"
                id="isotope-name"
                placeholder="Название"
                maxLength={20}
                minLength={5}
                required={true}
            />

            <button className="form__submit" type="submit">Сохранить</button>
        </Form>
    </>);
}
