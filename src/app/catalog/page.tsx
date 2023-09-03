"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import search from "../../../public/images/search.svg";
import "../product/product.css";

export default function Products(): JSX.Element {
  const [catalog, setCatalog] = useState([]);
  const [modal, setModal] = useState("hidden");
  const [Id, setId] = useState();

  const title = useRef<any>(null);
  const catalogId = useRef<any>(null);
  const title1 = useRef<any>(null);

  const fetchCatalogs = async () => {
    try {
      const response = await fetch("http://139.59.182.202/api/catalog");
      const data = await response.json();
      setCatalog(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchCatalogs();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const handleAddCatalog = async () => {
      console.log(title);

      const data = {
        catalog_name: title.current.value,
      };
      try {
        const response = await fetch("http://139.59.182.202/api/catalog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (responseData.errors) {
          console.log(responseData.errors);
        } else {
          console.log(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleAddCatalog();
  };

  //Delete
  const handleDeleteCatalog = (id: any) => {
    const handleDelete = async () => {
      try {
        const response = await fetch(
          `http://139.59.182.202/api/catalog/${id}`,
          {
            method: "DELETE",
          }
        );
        const responseData = await response.json();
        if (responseData.errors) {
          console.log(responseData.errors);
        } else {
          console.log(responseData);
          const response = await fetch("http://139.59.182.202/api/catalog");
          const data = await response.json();
          setCatalog(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleDelete();
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      catalog_name: title1.current.value,
    };
    console.log(data);

    try {
      const response = await fetch(`http://139.59.182.202/api/catalog/${Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.errors) {
        console.log(responseData.errors);
      } else {
        console.log(responseData);
        const response = await fetch("http://139.59.182.202/api/catalog");
        const data = await response.json();
        setCatalog(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handleEdit()
  //Modal

  const handleModal = () => {
    setModal("hidden");
  };

  const hendlEdit = (id: any) => {
    setId(id);
    setModal("block");
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="header fount p-5">Catalogs</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-8">Add new catalog</h2>
            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block fount">Catalog name</label>
                <input
                  ref={title}
                  type="text"
                  className="w-80 p-3 text-black rounded-lg focus:outline-none focus:ring "
                  placeholder="Catalog name:"
                />
              </li>
              <div className="mt-auto">
                <button
                  className="submit h-12 bg_fount text-center rounded-lg"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </ol>
          </form>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="form_title pl-8 fount">All catalogs</h2>
            </div>
            <ul>
              {catalog.map((el: any) => (
                <li
                  key={el.id}
                  className="flex items-center justify-between mb-4 text-emerald-300 bg-white p-4 rounded-lg"
                >
                  {el.catalog_name}
                  <div className="flex gap-5">
                    <button
                      className="edit_button bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mb-4"
                      onClick={() => hendlEdit(el.id)}
                    >
                      {/* ugfytghuy */}
                      Edit
                    </button>
                    <button
                      className="delete_button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4"
                      onClick={() => handleDeleteCatalog(el.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Modal */}
        <div className={`modal ${modal}`}>
          <button
            // onClick={() => handleModal()}
            className="modal_button ml-auto block border-5 border-blue"
            type="button"
          >
            x
          </button>

          <form className="pl-8 mb-4 p-2">
            <h2 className="form_title font mb-4">Edit catalog</h2>
            <ol className="flex items-center justify-between mb-4">
              <li>
                <label className="block font mb-1">Catalog name</label>
                <input
                  ref={title1}
                  type="text"
                  className="w-64 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Catalog name"
                />
              </li>
            </ol>
          </form>
        </div>
        <div
          className={`fixed inset-0 flex items-center   bg-gray-500 bg-opacity-75  ${modal}`}
        >
          <div className="bg-white rounded-md absolute top-[35%] right-[23%]">
            <button
              onClick={() => handleModal()}
              className="madal_button ml-auto block border-5 border-blue bg-[red]"
              type="button"
            >
              x
            </button>

            <form className="pl-8 mb-4 p-2" onSubmit={handleEditSubmit}>
              <ol className="flex items-center justify-between mb-4">
                <li className="flex items-center gap-9 justify-between">
                  <label className="block fount mb-1">Catalog name</label>
                  <input
                    ref={title1}
                    type="text"
                    className="w-64 p-3 rounded-lg text-black focus:outline-none focus:ring"
                    placeholder="Catalog name:"
                  />
                  <button
                    type="submit"
                    className="submit h-12 bg_fount text-center rounded-lg"
                  >
                    Update
                  </button>
                </li>
              </ol>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
