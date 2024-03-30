
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/services/auth/authService'; // Asegúrate de importar isAuthenticated desde el lugar correcto
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const [is_Authenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            isAuthenticated()
                .then((data) => {
                    if (!data.is_valid) {
                        router.push('/');
                    }
                    setIsAuthenticated(data.is_valid);
                })
                .catch((error: any) => {
                    router.push('/');
                });
        } catch (error) {
            //console.error('Error checking authentication:', error);
            setIsAuthenticated(false);
            router.push('/');
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return is_Authenticated;
};

export default useAuth;
