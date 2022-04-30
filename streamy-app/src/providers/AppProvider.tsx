import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from 'redux/store';

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                {children}
                <ToastContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default AppProvider;
