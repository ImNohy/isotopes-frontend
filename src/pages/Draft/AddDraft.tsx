import './style.scss';

import FallbackImage from '@/shared/ui/FallbackImage/FallbackImage';
import FallbackVideo from '@/shared/ui/FallbackVideo/FallbackVideo';
import Field from '@/shared/ui/Field/Field';

export default function AddDraftPage() {
    return (<>
        <form method="post" encType="multipart/form-data" className="form">
            <div className="form__media-wrapper">
                <Field
                    className="form__video-field"
                    label="Видео"
                    type="file"
                    name="video"
                    id="isotope-video"
                    accept="video/*"
                    required={true}
                />

                <FallbackVideo
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
                />

                <FallbackImage
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

            <button className="form__submit" type="button">Сохранить</button>
        </form>
    </>);
}
