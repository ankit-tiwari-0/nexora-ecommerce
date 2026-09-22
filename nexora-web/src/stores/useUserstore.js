import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create((set) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", {
                name,
                email,
                password
            });

            set({
                user: res.data,
                loading: false
            });

            toast.success("Account created successfully!");

        } catch (error) {
            console.error("Signup error:", error);

            set({ loading: false });

            toast.error(
                error.response?.data?.message ||
                "An error occurred"
            );
        }
    }
}));