import { FC } from 'react';
import LoadingAnimation from '../../assets/loader.svg?react';
import './Loader.scss';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({ isLoading }) => {
    return (
        <div className={`loader ${isLoading ? 'visible' : ''}`}>
            <LoadingAnimation className="svg-loader" />
        </div>
    );
}

export default Loader;