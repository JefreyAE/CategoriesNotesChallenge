const apiUrl = process.env.API_URL || "http://localhost:3000";
import { toastConfigCenter } from "@/app/constants/toatsconfig";
import { toast } from "react-toastify";

export const isAuthenticated = async (): Promise<any> =>{
    'use client'
    try{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
        }
        const response = await fetch(apiUrl + '/auth/check-auth', requestOptions);
        if(!response.ok){
            throw new Error(`Error in the request: ${response.status}`)
        }
        const data = await response.json();
        return data;
    }catch(error){
        toast.error('Error in the authentication', toastConfigCenter);
        throw error
    }
}

export const signUp = async (
    email: string,
    password: string,
): Promise<any> => {
    try {
        const newNote = { email, password };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        };

        const response = await fetch(apiUrl + "/auth/signup", requestOptions);
        if (!response.ok) {
            throw new Error(`Error in the request: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token) 
        toast.success("Successfully registered", toastConfigCenter);
        return data;
    } catch (error) {
        toast.error("Error in the request", toastConfigCenter);
        throw error;
    }
};

export const signIn = async (
    email: string,
    password: string,
): Promise<any> => {
    try {
        const newNote = { email, password };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        };

        const response = await fetch(apiUrl + "/auth/signin", requestOptions);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        localStorage.setItem('access_token', data.access_token) 
        localStorage.setItem('user', JSON.stringify(data.user)) 

        toast.success("Welcome", toastConfigCenter);
        return data;
    } catch (error:any) {
        toast.error(error.message, toastConfigCenter);
        throw error;
    }
};

