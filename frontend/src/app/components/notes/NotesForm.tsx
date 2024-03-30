"use client";
import { useEffect, useState } from "react";
import { createNote, getNote, updateNote } from "@/services/notes/notesService";
import { ToastContainer, toast } from "react-toastify";
import { getCategories } from "@/services/categories/categoriesService";
import { Note, Category } from "@/app/types/types";
import { toastConfigCenter } from "@/app/constants/toatsconfig";

interface NotesFormProps {
  updateList?: () => void
  noteId?: number | null
  reloadCategories?: boolean
}

export default function NotesForm({ updateList, noteId, reloadCategories }: NotesFormProps) {

  const [id, setId] = useState<string>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [categories, setCategories] = useState<[]>([])
  const [category_id, setCategory_id] = useState<string>('')

  useEffect(() => {
    getCategories()
      .then((data: []) => {
        setCategories(data)
      })
  }, [, reloadCategories])

  useEffect(() => {
    noteId && getNote(noteId)
      .then((data: Note) => {
        toast.info("Edit your note here", toastConfigCenter);
        setId(data.id)
        setTitle(data.title)
        setContent(data.content)
        setIsActive(data.is_active)
        data.category && setCategory_id(data.category.id)
      }).catch((error) => {
        toast.error("Error in fetching note:", toastConfigCenter);
      })
    if (!noteId) { setId(undefined); setTitle(''); setContent('') }
  }, [noteId])

  const handleUpdate = (e: any) => {
    e.preventDefault();
    if (title && content) {
      id && updateNote(id, title, content, isActive, category_id)
        .then(() => {
          toast.success("Successfully updated", toastConfigCenter);3
          updateList && updateList()
        })
        .catch((error: any) => {
          toast.error("Error in updating note:", toastConfigCenter);
        });
    } else {
      toast.warning("Title and content are required", toastConfigCenter);
    }
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (title && content) {
      createNote(title, content, category_id)
        .then(() => {
          toast.success("Successfully created", toastConfigCenter);
          updateList && updateList()
        })
        .catch((error: any) => {
          toast.error("Error in the request", toastConfigCenter);
         });
    } else {
      toast.warning("Title and content are required", toastConfigCenter);
    }
  };

  const handleSelectCategory = (e: any) => {
    setCategory_id(e.target.value)
  }

  const handleSelectChange = (e: any) => {
    setIsActive(e.target.value === 'true')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 place-items-center gap-2">
      <form
        className="animate-in flex-1 flex flex-row justify-center gap-2 text-foreground"
      >
        <label className="flex items-center" htmlFor="name"> Title:</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-0"
          name="name"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label className="flex items-center" htmlFor="description">Content: </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-0"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <label className="flex items-center" htmlFor="description">Category: </label>
        <select value={category_id || ''} onChange={handleSelectCategory} className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value={''} />
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {id && <>
          <label className="flex items-center" htmlFor="description">State: </label>
          <select value={isActive.toString()} onChange={handleSelectChange} className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="true">Active</option>
            <option value="false">Archived</option>
          </select>
        </>
        }
        {id && <button
          onClick={handleUpdate}
          type="submit"
          className="bg-blue-700 rounded-md px-4 py-0 text-foreground mb-0"
        >Update</button>}
        <button
          onClick={handleCreate}
          type="submit"
          className="bg-green-700 rounded-md px-4 py-0 text-foreground mb-0 w-80"
        > Create Note </button>
      </form>
      <ToastContainer />
    </div >
  );
}
