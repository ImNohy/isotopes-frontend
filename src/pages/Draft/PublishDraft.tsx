import { Form } from 'react-router';

import { useAppSelector } from '@/shared/redux/hooks';
import FallbackImage from '@/shared/ui/FallbackImage/FallbackImage';
import FallbackVideo from '@/shared/ui/FallbackVideo/FallbackVideo';
import Field from '@/shared/ui/Field/Field';
import Textarea from '@/shared/ui/Textarea/Textarea';
import { resolveStaticPath } from '@/shared/utils/resolveStaticPath';

export default function PublishDraftPage() {
    const isotopeDraft = useAppSelector(s => s.isotopes.draft);

    if (isotopeDraft === null) return null;

    return (<>
        <Form
            method="post"
            className="form"
        >
            <div className="form__media-wrapper">
                <h3 className='form__media-header'>Видео</h3>
                <FallbackVideo
                    src={isotopeDraft.videoUrl}
                    fallbackSrc={resolveStaticPath('assets/isotope.mp4')}
                    className="form__media-preview"
                    controls={true}
                    muted={true}
                />
            </div>

            <div className="form__media-wrapper">
                <h3 className='form__media-header'>Фото</h3>
                <FallbackImage
                    src={isotopeDraft.imageUrl}
                    fallbackSrc={resolveStaticPath('assets/isotope.png')}
                    className="form__media-preview"
                />
            </div>

            <Field
                className="form__half-life-field"
                label="Период полураспада (нс.)"
                type="text"
                inputMode="numeric"
                pattern="[0-9]+"
                name="halfLife"
                id="isotope-half-life"
                placeholder="Период в наносекундах"
                defaultValue={isotopeDraft.halfLife ?? ''}
                maxLength={27}
                required={true}
            />

            <div className="form__radiation-type-field radiation-type">
                <span className="radiation-type__label">α-распад</span>
                <div className="radiation-type__control">
                    <div className="radiation-type__prompt">Происходит α-распад</div>
                    <div className="radiation-type__divider"></div>
                    <input
                        type="checkbox"
                        name="isAlpha"
                        className="radiation-type__input"
                        defaultChecked={isotopeDraft.isAlpha ?? false}
                    />
                </div>
            </div>

            <Textarea
                className="form__description-field"
                label="Описание"
                defaultValue={isotopeDraft.description ?? ''}
                name="description"
                id="isotope-description"
                placeholder="Описание"
                maxLength={200}
                required={true}

            />

            <button className="form__submit" type="submit">Опубликовать</button>
        </Form>
    </>)
}
