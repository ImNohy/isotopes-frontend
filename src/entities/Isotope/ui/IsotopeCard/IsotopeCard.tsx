import './style.scss';

import { Link } from 'react-router';

import { LikeAction } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import FallbackImage from '@/shared/ui/FallbackImage/FallbackImage';
import LikeToggle from '@/shared/ui/LikeToggle/LikeToggle';
import { resolveStaticPath } from '@/shared/utils/resolveStaticPath';

import { deleteIsotopeThunk, setLikeThunk } from '../../model/thunks';

import type { IsotopeCardProps } from "./types";
export default function IsotopeCard({
    id,
    name,
    halfLifeFormatted,
    imageUrl,
    likeCount,
    isLiked,
    isAuthor,
}: IsotopeCardProps) {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(s => s.isotopes.isLoading);

    function handleLikeClick() {
        dispatch(setLikeThunk({
            id,
            action: isLiked ? LikeAction.Value0 : LikeAction.Value1,
        }));
    }

    return (
        <div className="isotope-card">
            {isAuthor && (
                <button
                    type="button"
                    className="isotope-card__delete"
                    onClick={() => dispatch(deleteIsotopeThunk(id))}
                    disabled={isLoading}
                >
                    <img src={resolveStaticPath('/icons/bin.svg')} className="isotope-card__delete-icon" />
                </button>
            )}

            <Link to={`/isotopes/feed/${id}`} className="isotope-card__link isotope-card__link--image">
                <FallbackImage
                    src={imageUrl}
                    fallbackSrc={ resolveStaticPath('/assets/isotope.png') }
                className="isotope-card__image"
                />
            </Link>
            <div className="isotope-card__content">
                <LikeToggle
                    className="isotope-card__like"
                    isLiked={isLiked}
                    likeCount={likeCount}
                    isHorizontal={true}
                    onToggle={handleLikeClick}
                    disabled={isLoading}
                />

                <Link to={`/isotopes/feed/${id}`} className="isotope-card__link isotope-card__link--name">
                    <h3 className="isotope-card__name">{name}</h3>
                </Link>
                <p className="isotope-card__half-life">T½: {halfLifeFormatted.full}</p>
            </div>
        </div>
    );
}
