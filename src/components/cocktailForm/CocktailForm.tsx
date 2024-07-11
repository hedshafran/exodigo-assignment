import { useCallback, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useCocktails } from '../../store/CocktailsContext';
import './CocktailForm.scss';
import { Cocktail } from '../../services/api/types';

type CocktailFormInputs = Omit<Cocktail, 'id'>;

const CocktailForm: React.FC = () => {
    const { addCocktail } = useCocktails();
    const { control, register, handleSubmit, reset, setValue } = useForm<CocktailFormInputs>({
        defaultValues: {
            name: '',
            thumb: '',
            glass: '',
            alcoholic: '',
            instructions: '',
            ingredients: [{ ingredient: '', measure: '' }],
        },
    });
    const [success, setSuccess] = useState(false);

    const onSubmit = useCallback((data: CocktailFormInputs) => {
        addCocktail({
            ...data,
            alcoholic: data.alcoholic === 'on' ? 'Alcoholic' : 'Non alcoholic',
            id: Date.now().toString()
        });
        setSuccess(true);
    }, [addCocktail, reset]);

    const onClearClicked = useCallback(() => {
        setSuccess(false);
        reset();
    }, []);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setValue('thumb', URL.createObjectURL(event.target.files[0]));
        }
    }, [setValue]);

    return (
        <main>
            <h1>Add a Cocktail</h1>
            <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Name*</label>
                <input
                    type="text"
                    placeholder="Cocktail name"
                    {...register('name', { required: true })}
                />
                <label htmlFor="thumb">Image*</label>
                <input
                    accept="image/*"
                    type="file"
                    placeholder="Upload image"
                    onChange={handleImageChange}
                />
                <label htmlFor="glass">Glass*</label>
                <input
                    type="text"
                    placeholder="Glass type"
                    {...register('glass', { required: true })}
                />
                <label htmlFor="instructions">Instructions</label>
                <textarea
                    placeholder="Instructions"
                    {...register('instructions', { required: true })}
                />
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        {...register('alcoholic', { required: true })}
                    />
                    Is alcoholic
                </label>
                <h3>Ingredients</h3>
                <div className="ingredients-container">
                    {fields.map((field, index) => (
                        <div className="ingredient" key={field.id}>
                            <input
                                type="text"
                                placeholder="Ingredient"
                                {...register(`ingredients.${index}.ingredient`, { required: true })}
                            />
                            <input
                                type="text"
                                placeholder="Measure"
                                {...register(`ingredients.${index}.measure`, { required: true })}
                            />
                            <button className="secondary-button" type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button className="secondary-button" type="button" onClick={() => append({ ingredient: '', measure: '' })}>Add Ingredient</button>
                {success && (
                    <>
                        <span className="success-text">Cocktail added successfully!</span>
                        <button className="secondary-button clear-button" onClick={onClearClicked}>Add another</button>
                    </>
                )}
                <button className="submit-button" disabled={success} type="submit">Add Cocktail</button>
            </form>
        </main>
    );
};

export default CocktailForm;
