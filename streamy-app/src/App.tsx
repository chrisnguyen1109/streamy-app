import LazyLoad from 'components/LazyLoad';
import Navigation from 'components/Navigation';
import { useAuth } from 'hooks';
import AppProvider from 'providers/AppProvider';
import { Suspense } from 'react';
import AppRoutes from 'routes';

const App: React.FC = () => {
    const { loaded } = useAuth();

    return (
        <AppProvider>
            {loaded && (
                <>
                    <Navigation />
                    <Suspense fallback={<LazyLoad />}>
                        <div className="container">
                            <AppRoutes />
                        </div>
                    </Suspense>
                </>
            )}
        </AppProvider>
    );
};

export default App;
