"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import search from "../../../public/images/search.svg";
import "../product/product.css";
import axios from "axios";
import { MdDeleteSweep } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

interface RefType {
  current: HTMLDivElement | null;
}

export default function Products(): JSX.Element {
  const [catalog, setCatalog] = useState([]);
  const [categori, setCategori] = useState([]);
  const [subcategori, setSubcategori] = useState([]);
  const [Id, setId] = useState(0);
  const [modal, setModal] = useState("hidden");

  const [brend, setBrend] = useState([]);

  const files = useRef<any>(null);
  const title = useRef<any>(null);
  const catalogId = useRef<any>(null);
  const category_id = useRef<any>(null);
  const subcategoryId = useRef<any>(null);

  const files1 = useRef<any>(null);
  const title1 = useRef<any>(null);
  const catalogId1 = useRef<any>(null);
  const categoriesId1 = useRef<any>(null);
  const subcategoryId1 = useRef<any>(null);

  const renderTitle = (title: string) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://139.59.182.202/api/category");
        const data1 = await response1.json();
        setCategori(data1.data);
        const response2 = await fetch("http://139.59.182.202/api/catalog");

        const data2 = await response2.json();
        setCatalog(data2.data);

        const response4 = await fetch("http://139.59.182.202/api/subcategory");

        const data4 = await response4.json();
        setSubcategori(data4.data);
        const response5 = await fetch("http://139.59.182.202/api/brand");
        const data5 = await response5.json();
        setBrend(data5.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // console.log(files.current.files[0].name);

    const hendlepic = async () => {
      try {
        const formData = new FormData();
        formData.append("file", files.current?.files[0]);
        const response = await axios.post(
          "http://139.59.182.202/api/file",
          formData
        );
        const data = response.data;
        const datas = {
          brand_image: data.name,
          brand_name: title.current.value,
          catalog_id: +catalogId.current.value,
          category_id: +category_id.current.value,
          subcategory_id: +subcategoryId.current.value,
        };
        console.log(datas);

        fetch("http://139.59.182.202/api/brand", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              console.log(data);
              alert(data.message);
            }
            const response5 = await fetch("http://139.59.182.202/api/brand");
            const data5 = await response5.json();
            setBrend(data5.data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    hendlepic();
  };

  //Modal

  const handleModal = () => {
    setModal("hidden");
  };

  const hendlEdit = (el: number) => {
    setModal("block");
    setId(el);
  };

  //Delete
  const handleDeleteProduct = (index: number) => {
    fetch(`http://139.59.182.202/api/brand/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log(data);
          const response5 = await fetch("http://139.59.182.202/api/brand");
          const data5 = await response5.json();
          setBrend(data5.data);
          alert(data.message);
        }
      });
  };

  //Edit
  const handleEdit = async (e: any) => {
    e.preventDefault();

    const hendlepic = async () => {
      const formData = new FormData();
      formData.append("file", files1.current?.files[0]);
      try {
        const response = await axios.post(
          "http://139.59.182.202/api/file",
          formData
        );
        const data = response.data;

        const datas = {
          brand_image: data.name,
          brand_name: title1.current.value,
          catalog_id: +catalogId1.current.value,
          category_id: +categoriesId1.current.value,
          subcategory_id: +subcategoryId1.current.value,
        };

        console.log(datas);

        fetch(`http://139.59.182.202/api/brand/${Id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              console.log(data);
              alert(data.message);
            }
            const response5 = await fetch("http://139.59.182.202/api/brand");
            const data5 = await response5.json();
            setBrend(data5.data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    hendlepic();
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="header fount p-5">Brends</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-8">Add new brends</h2>
            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block fount">Title</label>
                <input
                  ref={title}
                  type="text"
                  className="w-80 p-3 rounded-lg text-black focus:outline-none focus:ring"
                  placeholder="Title"
                />
              </li>
              <li>
                <label className="block fount">Picture </label>
                <input
                  ref={files}
                  // onChange={handleFileChange}
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring file:mr-4 file:py-0 file:px-2
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-800
                     hover:file:bg-violet-100"
                  placeholder="Yuklash"
                  type="file"
                />
              </li>

              <li>
                <label className="block fount">Catalog</label>
                <select
                  ref={catalogId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Catalog
                  </option>
                  {catalog.map((el: any) => (
                    <option value={el.id}>{el.catalog_name}</option>
                  ))}
                </select>
              </li>
            </ol>

            <ol className="flex items-center justify-between mb-8">
              <li>
                <label className="block fount">Category</label>

                <select
                  ref={category_id}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Category
                  </option>
                  {categori.map((el: any) => (
                    <option value={el.id}>{el.category_name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block fount">Subcategory</label>

                <select
                  ref={subcategoryId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Subcategory
                  </option>
                  {subcategori.map((el: any) => (
                    <option value={el.id}>{el.subcategory_name}</option>
                  ))}
                </select>
              </li>
              <div className="mt-auto">
                <button
                  className="submit h-12 bg_fount text-center rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </ol>
          </form>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="form_title pl-8 fount">Partner brands</h2>
            </div>
            <hr className="border-2 bg_fount mb-2" />
            <ol className="m-0 p-0  flex flex-wrap gap-5 ">
              {brend.map((el: any) => (
                <li className="list_item  max-w-[250px] min-w-[250px] border mt-8 rounded-xl bg-white drop-shadow-lg ">
                  <Image
                    className="inline w-full h-[250px]  rounded-xl p-1"
                    src={`http://139.59.182.202/${el.brand_image}`}
                    alt=""
                    width="200"
                    height="300"
                  />

                  <div className=" p-3">
                    <p className="text-xl max-w-[200px] font-bold pl-1 mb-8 ">
                      {renderTitle(el.brand_name)}
                    </p>

                    <div className="flex items-center ml-auto">
                      <button
                        onClick={() => {
                          hendlEdit(el.id);
                        }}
                        className=" flex bg_fount text-white rounded-lg   border-2 p-2 mr-2"
                      >
                        <BiSolidEditAlt
                          color="yellow"
                          style={{ width: "24px", height: "24px" }}
                        />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(el.id)}
                        className="flex bg_fount text-white rounded-lg  bg-red border-2 p-2"
                      >
                        <MdDeleteSweep
                          style={{
                            color: "red",
                            width: "24px",
                            height: "24px",
                          }}
                        />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {/* ================ */}
            <div className={`border-black madal ${modal}`}>
              <button
                onClick={() => handleModal()}
                className="madal_button ml-auto block border-5 border-blue"
                type="button"
              >
                x
              </button>

              <form className="pl-8 mb-4 p-2" onSubmit={handleEdit}>
                <h2 className="form_title fount mb-4">Edit products</h2>
                <ol className="flex items-center justify-between mb-4">
                  <li>
                    <label className="block fount mb-1">Title</label>
                    <input
                      ref={title1}
                      type="text"
                      className="w-64 p-3 rounded-lg focus:outline-none focus:ring"
                      placeholder="Title"
                    />
                  </li>
                  <li>
                    <label className="block fount mb-1">Picture </label>
                    <input
                      ref={files1}
                      className="w-64 p-3 rounded-lg focus:outline-none focus:ring file:mr-4 file:py-0 file:px-2
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-800
      hover:file:bg-violet-100"
                      placeholder="download"
                      type="file"
                    />
                  </li>
                  <li>
                    <label className="block fount mb-1">Catalog</label>
                    <select
                      ref={catalogId1}
                      className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                    >
                      <option value="" disabled hidden></option>
                      {catalog.map((el: any) => (
                        <option value={el.id}>{el.catalog_name}</option>
                      ))}
                    </select>
                  </li>
                </ol>

                <ol className="flex items-center justify-between mb-4">
                  <li>
                    <label className="block fount mb-1">Categori</label>
                    <select
                      ref={categoriesId1}
                      className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                    >
                      <option value="" disabled hidden>
                        Option
                      </option>
                      {categori.map((el: any) => (
                        <option value={el.id}>{el.category_name}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <label className="block fount mb-1">Subcategory</label>

                    <select
                      ref={subcategoryId1}
                      className="hidden_pleceholder w-64 p-3 rounded-lg focus:outline-none focus:ring"
                    >
                      <option value="" disabled hidden></option>
                      {subcategori.map((el: any) => (
                        <option value={el.id}>{el.subcategory_name}</option>
                      ))}
                    </select>
                  </li>
                  <div className="mt-auto">
                    <button
                      className="submit  max-w-[256px] min-w-[256px]  h-12 bg_fount text-center  rounded-lg active:bg-sky-700"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </ol>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
