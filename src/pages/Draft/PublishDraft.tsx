import { Form } from 'react-router';

import { useAppSelector } from '@/shared/redux/hooks';
import Field from '@/shared/ui/Field/Field';
import Textarea from '@/shared/ui/Textarea/Textarea';

export default function PublishDraftPage() {
    const isotopeDraft = useAppSelector(s => s.isotopes.draft);

    if (isotopeDraft === null) return null;

    return (<>
        <Form
            method="post"
            className="form"
        >
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
