"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import search from "../../../public/images/search.svg";
import "../product/product.css";

interface RefType {
  current: HTMLDivElement | null;
}

export default function Products(): JSX.Element {
  const [category, setCategory] = useState([]);
  const [Id, setId] = useState();

  const [catalog, setCatalog] = useState([]);
  const [modal, setModal] = useState("hidden");
  const title1 = useRef<any>(null);

  const catalogId = useRef<any>(null);
  const catalogId1 = useRef<any>(null);

  const title = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch("http://139.59.182.202/api/category");
        const data2 = await response2.json();
        setCategory(data2.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsee = await fetch("http://139.59.182.202/api/catalog");
        const dataa = await responsee.json();
        setCatalog(dataa.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleSubmits = (e: any) => {
    e.preventDefault();

    const hendlepic = async () => {
      const data = {
        category_name: title.current.value,
        catalog_id: +catalogId.current.value,
      };

      console.log(data);
      console.log(catalogId.current.value);

      try {
        fetch("http://139.59.182.202/api/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              console.log(data);
            }
            const response2 = await fetch("http://139.59.182.202/api/category");
            const data2 = await response2.json();
            setCategory(data2.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    hendlepic();
  };

  const handleModal = () => {
    setModal("hidden");
  };

  const hendlEdit = (id: any) => {
    setId(id);
    setModal("block");
  };
  const handleDeleteCategory = (id: any) => {
    const handleDelete = async () => {
      try {
        const response = await fetch(
          `http://139.59.182.202/api/category/${id}`,
          {
            method: "DELETE",
          }
        );
        const responseData = await response.json();
        if (responseData.errors) {
          console.log(responseData.errors);
        } else {
          console.log(responseData);
          const response = await fetch("http://139.59.182.202/api/category");
          const data = await response.json();
          setCategory(data.data);
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
      category_name: title1.current.value,
      catalog_id: +catalogId1.current.value,
    };

    try {
      const response = await fetch(`http://139.59.182.202/api/category/${Id}`, {
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
        alert(responseData.message);
        const response = await fetch("http://139.59.182.202/api/category");
        const data = await response.json();
        setCategory(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div>
          <h1 className="header fount p-5">Category</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmits}>
            <h2 className="form_title fount mb-8">Add new category</h2>
            <ol className="flex items-center gap-10 mb-8">
              <li>
                <label className="block fount">Category name</label>
                <input
                  ref={title}
                  type="text"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring text-black"
                  placeholder="Category name"
                />
              </li>
              <li>
                <label className="block fount">Catalog</label>
                <select
                  ref={catalogId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  {catalog.map((el: any) => (
                    <option value={el.id}>{el.catalog_name}</option>
                  ))}
                </select>
              </li>
              <li className="ml-auto">
                <button
                  className="submit mt-9 bg_fount text-center rounded-lg"
                  type="submit"
                >
                  Qo’shish
                </button>
              </li>
            </ol>
          </form>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="form_title pl-8 fount">All category</h2>
            </div>
            <ul>
              {category.map((el: any) => (
                <li
                  key={el.id}
                  className="flex items-center justify-between mb-4 text-emerald-300 bg-white p-4 rounded-lg"
                >
                  {el.category_name}
                  <div className="flex gap-5">
                    <button
                      className="edit_button bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded mb-4"
                      onClick={() => hendlEdit(el.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete_button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4"
                      onClick={() => handleDeleteCategory(el.id)}
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
            onClick={() => handleModal()}
            className="modal_button ml-auto block border-5 border-blue"
            type="button"
          >
            x
          </button>

          <form className="pl-8 mb-4 p-2">
            <h2 className="form_title font mb-4">Edit category</h2>
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
                  <select
                    ref={catalogId1}
                    className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  >
                    <option>Catalog</option>
                    {catalog.map((el: any) => (
                      <option value={el.id}>{el.catalog_name}</option>
                    ))}
                  </select>
                  <input
                    ref={title1}
                    type="text"
                    className="w-64 p-3 rounded-lg text-black focus:outline-none focus:ring"
                    placeholder="Category name:"
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
