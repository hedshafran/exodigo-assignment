import { ChangeEvent, FC, useCallback, useState } from 'react';
import api from '../../services/api/api';
import Modal from 'react-modal';
import { Cocktail } from '../../services/api/types';
import CocktailCard from '../../components/cocktailCard/CocktailCard';
import { useCocktails } from '../../store/CocktailsContext';
import { useDebouncedCallback } from '../../utils/hooks';
import Recipe from '../../components/recipe/Recipe';
import CloseIcon from '../../assets/close.svg?react';
import Loader from '../../components/loader/Loader';
import './Home.scss';

const modalStyles = {
    content: { inset: '10%', borderRadius: '30px' },
}

const Home: FC = () => {
    const { cocktails: savedCocktails } = useCocktails();
    const [cocktails, setCocktails] = useState<Cocktail[]>(savedCocktails);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

    const onSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
        const query: string = event.target.value;
        if (query.length < 3) {
            setCocktails(savedCocktails);
            return;
        }
        setLoading(true);
        api.searchCocktails(query)
            .then((cocktails: Cocktail[]) => {
                setCocktails([
                    ...cocktails,
                    ...savedCocktails.filter((drink: Cocktail) =>
                        drink.name.toLowerCase().includes(query.toLowerCase())
                    ),
                ]);
                setLoading(false);
            })
            .catch((error: Error) => {
                setError(error.message);
                setLoading(false);
            });
    }, 300);

    const onCocktailClick = useCallback((cocktail: Cocktail) => {
        setSelectedCocktail(cocktail);
        setModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    return (
        <main>
            <h1 className="title">Cocktails</h1>
            <input className="search-input" type="text" placeholder="Search for a cocktail" onChange={onSearch} />
            {error && <span className="error">{error}</span>}
            <div className="cocktails-grid">
                {cocktails.map((cocktail) => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} onClick={onCocktailClick} />
                ))}
            </div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={modalStyles}
            >
                <div>
                    <CloseIcon className="close-modal-icon" onClick={closeModal} />
                    {selectedCocktail && <Recipe cocktail={selectedCocktail} />}
                </div>
            </Modal>
            <Loader isLoading={loading} />
        </main>
    );
};

export default Home;
