import './style.scss';

import { Form } from 'react-router';

import { setExponent } from '@/entities/Isotope/model/slice';
import { useAppDispatch } from '@/shared/redux/hooks';

import type { SearchProps } from "./types";
const EMPTY_STATE_MESSAGE = 'T½, макс. (нс)';
const BASE = 10n;

export default function Search({
    className,
    maxHalfLifeExponent,
}: SearchProps) {
    const hasValue = maxHalfLifeExponent !== undefined;
    const dispatch = useAppDispatch();

    return (
        <Form method="get" className={`search ${className}`}>
            <div className="search__value-display">
                {hasValue ? `${BASE ** BigInt(maxHalfLifeExponent)} нс.` : EMPTY_STATE_MESSAGE}
            </div>
            <button className="search__find" type="submit">Найти</button>

            <div className="search__slider-wrapper slider">
                <h3 className="slider__label slider__label--lower">0 нс.</h3>
                <h3 className="slider__label slider__label--upper">1e27 нс.</h3>
                <input className="slider__input"
                    name="maxHalfLifeExponent"
                    type="range"
                    min="-1"
                    max="27"
                    step="1"
                    value={maxHalfLifeExponent}
                    onChange={event => {
                        const newExponentValue = Number(event.currentTarget.value);
                        dispatch(setExponent(newExponentValue === -1 ? undefined : newExponentValue));
                    }}
                />
            </div>
        </Form>
    );
}
