'use client'
import { toastConfigCenter } from "@/app/constants/toatsconfig";
import { deleteNote } from "@/services/notes/notesService";
import { toast } from "react-toastify";
interface ListTableProps {
    lists: []
    updateList?: () => void
    selectNote?: (id: number) => void
}

export default function ListTable({ lists = [], updateList, selectNote }: ListTableProps) {

    const handleDelete = (id: string) => {
        deleteNote(id)
            .then(() => {
                toast.success("Successfully deleted", toastConfigCenter);
                updateList && updateList()
            }).catch((error)=>{
                toast.error("Error in the request", toastConfigCenter);
                toast.error(`${error.message}`, toastConfigCenter);
            })
    }

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleEdit = (id: number) => {
        selectNote && selectNote(id)
        handleScrollToTop()
    };
    return (
        <>
            {
                <div className="flex flex-col flex-wrap w-full place-items-center">
                    <div className="flex flex-col w-full justify-self-center">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead
                                            className="border-b bg-neutral-800 font-medium text-center text-white dark:border-neutral-500 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" className=" px-6 py-4">Title</th>
                                                <th scope="col" className=" px-6 py-4">Content</th>
                                                <th scope="col" className=" px-6 py-4">State</th>
                                                <th scope="col" className=" px-6 py-4">Category</th>
                                                <th scope="col" className=" px-6 py-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lists.map((data: any, index: number) => {
                                                return (
                                                    <tr key={index} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">{data.title}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">{data.content}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">{data.is_active ? 'Active' : 'Archived'}</td>
                                                        {data.category ?
                                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center">{data.category.name}</td>
                                                            :
                                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-center"></td>
                                                        }
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">
                                                            <button type="button" onClick={(e) => { handleEdit(data.id) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
                                                            <button type="button" onClick={(e) => { handleDelete(data.id) }} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}