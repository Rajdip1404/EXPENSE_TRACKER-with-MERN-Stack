import { useContext, useEffect } from "react"
import { UserContext } from "../context/user.context"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) return;
        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                console.log(response)
                if(isMounted && response.data) {
                    updateUser(response.data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                if(isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user, navigate, updateUser, clearUser]);
};