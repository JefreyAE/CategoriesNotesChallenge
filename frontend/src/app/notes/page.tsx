'use client'
import "react-toastify/dist/ReactToastify.css";
import NotesForm from "../components/notes/NotesForm";
import NotesList from "../components/notes/NotesList";
import { useEffect, useState } from "react";
import { getNotes, getNotesActive, getNotesArchived, getNotesByCategory } from "@/services/notes/notesService";
import IsLoading from "../components/IsLoading";
import CategoriesForm from "../components/categories/CategoriesForm";
import { Category } from "../types/types";
import { getCategories } from "@/services/categories/categoriesService";
import { isAuthenticated } from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastConfigCenter } from "../constants/toatsconfig";
import LogOutButton from "../components/auth/LogOutButton";

export default function Home() {
  const router = useRouter()
  const [list, setList] = useState<[]>([])
  const [listTitle, setListTitle] = useState<string>()
  const [listShowing, setListShowing] = useState<'All' | 'Active' | 'Archived'>('Active')
  const [isLoading, setIsLoading] = useState(false);
  const [noteId, setNoteId] = useState<number | null>()
  const [reloadCategories, setReloadCategories] = useState(false)
  const [category_id, setCategory_id] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    isAuthenticated()
      .catch((error) => {
        router.push('/')
      })
    fetchData(getNotesActive, 'Active notes', 'Active')
  }, [])

  useEffect(() => {
    getCategories()
      .then((data: []) => {
        setCategories(data)
      })
  }, [, reloadCategories])

  const fetchData = (fetchFunction: (data: string) => Promise<any>, title: string, showingState: any, data?: any) => {
    setNoteId(undefined);
    setIsLoading(true);

    fetchFunction(data)
      .then((data) => {
        setListTitle(title);
        setList(data);
        setListShowing(showingState);
        setIsLoading(false);
      })
      .catch((error) => {
        setList([]);
        setIsLoading(false);
        toast.error("Error in fetching note:", toastConfigCenter);
      });
  }

  const updateCategories = (): void => {
    setReloadCategories((prevReloadCategories) => !prevReloadCategories);
  }

  const updateList = () => {
    if (listShowing === 'All') {
      fetchData(getNotes, 'All notes', 'All')
    } else if (listShowing === 'Active') {
      fetchData(getNotesActive, 'Active notes', 'Active')
    } else if (listShowing === 'Archived') {
      fetchData(getNotesArchived, 'Archived notes', 'Archived')
    } else if (listShowing === 'Categories') {
      listTitle && fetchData(getNotesByCategory, listTitle, 'd', category_id)
    }
  }

  const handleSelectCategory = (e: any) => {
    const [categoryId, categoryName] = e.target.value.split(',');
    categoryId && setListTitle(`Notes ${categoryName}`)
    categoryId && fetchData(getNotesByCategory, `Notes ${categoryName}`, 'Categories', categoryId)
    setCategory_id(categoryId)
  }

  return (
    <>
      <nav className="w-full content-end flex justify-right border-b border-b-foreground/10 h-16">
        <div className="w-full flex justify-end p-3 text-sm">
          <LogOutButton />
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center  p-24">
        <div className="z-10 w-full items-center font-mono text-sm lg:flex">
          <div className="flex flex-col gap-5 w-full items-center ">
            <p className="text-3xl lg:text-4xl !leading-tight mx-auto w-full text-center">
              Create your notes and categories here:{" "}
            </p>
            <NotesForm updateList={updateList} reloadCategories={reloadCategories} noteId={noteId} />
            <CategoriesForm updateCategories={updateCategories} />
            <hr></hr>
            <section className="flex flex-row w-full items-center gap-2 place-content-center">
              <button type="button" onClick={(e) => fetchData(getNotesActive, 'Active notes', 'Active')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Active notes</button>
              <button type="button" onClick={(e) => fetchData(getNotesArchived, 'Archived notes', 'Archived')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Archived notes</button>
              <button type="button" onClick={(e) => fetchData(getNotes, 'All notes', 'All')} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">All notes</button>
              <select onChange={handleSelectCategory} className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={''} />
                {categories.map((category: Category) => (
                  <option key={category.id} value={`${category.id},${category.name}`}>
                    {category.name}
                  </option>
                ))}
              </select>
            </section>
            <div className="flex flex-col flex-wrap w-full place-items-center">
              <h2 className="font-bold text-4xl mb-4 ">{listTitle}</h2>
            </div>
            {isLoading && <IsLoading message={"Loading..."} />}
            {(list.length > 0) && <NotesList lists={list} updateList={updateList} selectNote={setNoteId} />}
          </div>
        </div>
      </main>
    </>
  );
}
