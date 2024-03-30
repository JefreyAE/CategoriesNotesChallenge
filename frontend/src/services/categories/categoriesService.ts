const apiUrl = process.env.API_URL || "http://localhost:3000";
import { toastConfigCenter } from "@/app/constants/toatsconfig";
import { checkAuth } from "@/app/utils/redirectToLogin";
import { toast } from "react-toastify";

export const createCategory = async (
  name: string,
): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({ name }),
    };

    const response = await fetch(apiUrl + "/categories/create", requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    toast.success("Successfully created", toastConfigCenter);
    return data;
  } catch (error) {
    toast.error("Error in the request", toastConfigCenter);
    console.error("Error in the request:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
  }
    const response = await fetch(apiUrl + "/categories/listAll", requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetching categories:", error);
    throw error;
  }
};
