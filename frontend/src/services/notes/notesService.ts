import { checkAuth } from "@/app/utils/redirectToLogin";

const apiUrl = process.env.API_URL || "http://localhost:3000";

export const getNote = async (id:number): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
  }
    const response = await fetch(apiUrl + `/notes/note/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    //console.error("Error in fetching note:", error);
    throw error;
  }
};

export const createNote = async (
  title: string,
  content: string,
  category_id: string = ''
): Promise<any> => {
  try {
    checkAuth()
    const newNote = { title, content, category_id, is_active: true };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(newNote),
    };

    const response = await fetch(apiUrl + "/notes/create", requestOptions);
    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    console.error("Error in the request:", error.message);
    throw error;
  }
};

export const updateNote = async (
  id: string,
  title: string,
  content: string,
  is_active: boolean,
  category_id?: string 
): Promise<any> => {
  try {
    checkAuth()
    const newNote = { title, content, category_id,  is_active};

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(newNote),
    };

    const response = await fetch(apiUrl + `/notes/update/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in the request:", error);
    throw error;
  }
};

export const getNotes = async (): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
  }
    const response = await fetch(apiUrl + "/notes/listAll", requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetching notes:", error);
    throw error;
  }
};

export const getNotesByCategory = async (id:string): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
  }
    const response = await fetch(apiUrl + `/notes/listByCategory/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetching notes:", error);
    throw error;
  }
};

export const getNotesActive = async (): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
  }
    const response = await fetch(apiUrl + "/notes/listActive", requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetching notes:", error);
    throw error;
  }
};

export const getNotesArchived = async (): Promise<any> => {
  try {
    checkAuth()
    const requestOptions = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
  }
    const response = await fetch(apiUrl + "/notes/listArchived", requestOptions);

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetching notes:", error);
    throw error;
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    checkAuth()
    const response = await fetch(apiUrl + `/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    })
    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }
    
  } catch (error: any) {
    throw new Error(`Error deleting note: ${error.message}`);
  }
}