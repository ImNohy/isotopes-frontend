import './style.scss';

import { Link } from 'react-router';

import { setLikeThunk } from '@/entities/Isotope/model/thunks';
import { LikeAction } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import FallbackVideo from '@/shared/ui/FallbackVideo/FallbackVideo';
import LikeToggle from '@/shared/ui/LikeToggle/LikeToggle';
import { makeClassString } from '@/shared/utils/makeClassString';

export default function FeedPage() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(s => s.isotopes.isLoading);

    const isotope = useAppSelector(s => s.isotopes.selected);
    if (isotope === null) return null;

    function handleLikeClick() {
        if (isotope === null) return;

        dispatch(setLikeThunk({
            id: isotope.id,
            action: isotope.isLiked ? LikeAction.Value0 : LikeAction.Value1,
        }))
    }

    return (<>
        <FallbackVideo
            src={isotope.videoUrl}
            fallbackSrc="/assets/isotope.mp4"
            className="isotope-page__video"
            autoPlay={true}
            loop={true}
            muted={true}
        />

        <div className="isotope-page__overlay">
        </div>

        <div className="isotope-page__content">
            <div className="isotope-page__meta meta">
                <LikeToggle
                    className="meta__like"
                    likeCount={isotope.likeCount}
                    onToggle={handleLikeClick}
                    isLiked={isotope.isLiked}
                    disabled={isLoading}
                />

                <div className={makeClassString(
                    'property-display',
                    'isotope-page__radiation-type',
                    'radiation-type',
                    isotope.isAlpha && 'radiation-type--alpha',
                )}>
                    <img src="/icons/alpha.svg" className="property-display__label-icon" />
                    <div className="property-display__value radiation-type__value">
                        <img src={isotope.isAlpha ? '/icons/check.svg' : '/icons/cross.svg'} />
                    </div>
                </div>

                <div className={makeClassString(
                    "property-display",
                    "isotope-page__half-life",
                    'half-life',
                )} title={isotope.halfLifeFormatted.full}>
                    <div className="property-display__label">T½</div>
                    <div className="property-display__value half-life__value">{isotope.halfLifeFormatted.compact}</div>
                </div>

                <Link to={`/isotopes/feed/${isotope.id}?next=true`} className="meta__next next-button">
                    <img src="/icons/chevrons-right.svg" className="next-button__icon" />
                </Link>
            </div>

            <div className="isotope-page__info">
                <h1 className="isotope-page__name">{isotope.name}</h1>

                <div className="isotope-page__description description">
                    <p className="description__content">{isotope.description}</p>

                    <label className="description__action">
                        <input type="checkbox" className="description__toggle" />

                        <div className="description__more">Подробнее</div>
                        <div className="description__less">Скрыть</div>
                    </label>
                </div>
            </div>
        </div >
    </>)
}
