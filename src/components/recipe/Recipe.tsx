import { FC } from 'react';
import { Cocktail } from '../../services/api/types';
import './Recipe.scss';

interface RecipeProps {
  cocktail: Cocktail;
}

const Recipe: FC<RecipeProps> = ({ cocktail }) => {
  return (
    <div className="recipe-container">
      <h1>{cocktail.name}</h1>
      <div className="image-container">
        <img className="cocktail-image" src={cocktail.thumb} alt={cocktail.name} />
        <span className="general-info">*{cocktail.alcoholic}</span>
        <span className="general-info">* Glass type: {cocktail.glass}</span>
      </div>
      <h3>Ingredients</h3>
      <ul>
        {cocktail.ingredients.map(({ ingredient, measure }) => {
          return (
            <li key={ingredient}>
              <b>{ingredient}</b> - {measure ? measure : 'to taste'}
            </li>
          );
        })}
      </ul>
      <h3>Instructions</h3>
      <p>{cocktail.instructions}</p>
    </div>
  );
};

export default Recipe;
