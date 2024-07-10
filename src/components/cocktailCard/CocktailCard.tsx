import { useCallback } from 'react';
import { Cocktail } from '../../services/api/types';
import './CocktailCard.scss';

interface CocktailCardProps {
    cocktail: Cocktail;
    onClick: (cocktail: Cocktail) => void;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(cocktail);
    }, [cocktail, onClick]);
    return (
        <div className="cocktail-card" onClick={handleClick}>
            <img src={cocktail.thumb} alt={cocktail.name} />
            <h3>{cocktail.name}</h3>
        </div>
    );
};

export default CocktailCard;