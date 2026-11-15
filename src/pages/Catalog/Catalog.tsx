import './style.scss';

import IsotopeCard from '@/entities/Isotope/ui/IsotopeCard/IsotopeCard';
import Search from '@/features/Search/Search';
import { useAppSelector } from '@/shared/redux/hooks';

export default function CatalogPage() {
    const isotopes = useAppSelector(s => s.isotopes.isotopes);
    const maxHalfLifeExponent = useAppSelector(s => s.isotopes.maxHalfLifeExponent);

    return (<>
        <section className="catalog">
            <Search
                className="catalog__search"
                maxHalfLifeExponent={maxHalfLifeExponent}
            />
            <ul className="catalog__list">
                {isotopes.map(isotope => (
                    <li className="catalog__item" key={isotope.id}>
                        <IsotopeCard {...isotope} />
                    </li>
                ))}
            </ul>
        </section>
    </>)
}
