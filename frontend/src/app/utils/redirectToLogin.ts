import { isAuthenticated } from "@/services/auth/authService";

export const checkAuth = async () => {
    try {
        isAuthenticated()
            .then((data) => {
                if (!data.is_valid) {
                    window.location.href = '/';
                }
            })
            .catch((error: any) => {
                window.location.href = '/';
            });
    } catch (error) {
        window.location.href = '/';
    }
};