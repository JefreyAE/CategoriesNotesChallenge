"use client";
import { toastConfigCenter } from "@/app/constants/toatsconfig";
import { createCategory } from "@/services/categories/categoriesService";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface CategoriesFormProps {
  updateCategories?: () => void
}

export default function CategoriesForm({ updateCategories }: CategoriesFormProps) {

  const [name, setName] = useState<string>("");

  const handleCreate = (e: any) => {
    e.preventDefault();
    if (name) {
      createCategory(name)
        .then(() => {
          updateCategories && updateCategories()
        })
        .catch((error: any) => { });
    } else {
      toast.warning("The category name is required", toastConfigCenter);
    }
  };
  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-row w-full justify-center gap-2 text-foreground"
      >
        <label className="flex items-center" htmlFor="name">Category name:</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-0"
          name="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <button
          onClick={handleCreate}
          type="submit"
          className="bg-green-700 rounded-md px-4 py-0 text-foreground mb-0"
        > Create Category </button>
      </form>
      <ToastContainer />
    </div>
  );
}
