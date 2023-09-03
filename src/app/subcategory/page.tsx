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

export default function Product(): JSX.Element {
  const [modal, setModal] = useState("hidden");

  const [product, setProduct] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [id, setId] = useState(null);
  const [discountProduct, setDiscountProduct] = useState([]);
  const [subcategori, setSubcategori] = useState([]);

  const productId = useRef<any>(null);
  const percent = useRef<any>(null);

  const end_time = useRef<any>(null);

  const productIdEdit = useRef<any>(null);
  const percentEdit = useRef<any>(null);

  const end_timeEdit = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch("http://139.59.182.202/api/category");
        const data2 = await response2.json();
        setProduct(data2?.data);
        const responseDiscount = await fetch(
          "http://139.59.182.202/api/subcategory"
        );
        const data3 = await responseDiscount.json();
        setDiscountProduct(data3?.data);
        // catalog
        const responseCatalog = await fetch(
          "http://139.59.182.202/api/catalog"
        );
        const data4 = await responseCatalog.json();
        setCatalog(data4?.data);
        console.log(data4?.data, "setCatalog");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const getDiscout = async () => {
    const responseDiscount = await fetch(
      "http://139.59.182.202/api/subcategory"
    );
    const data3 = await responseDiscount.json();
    setDiscountProduct(data3?.data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const hendlepic = async () => {
      const data = {
        category_id: +productId.current.value,
        catalog_id: +percent.current.value,
        subcategory_name: end_time.current.value,
      };
      console.log(data, "data");

      try {
        fetch("http://139.59.182.202/api/subcategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              getDiscout();
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    hendlepic();
  };

  const EditSubmit = (e: any) => {
    e.preventDefault();

    const hendlepic = async () => {
      const data = {
        category_id: +productIdEdit.current.value,
        catalog_id: +percentEdit.current.value,
        subcategory_name: end_timeEdit.current.value,
      };

      try {
        fetch(`http://139.59.182.202/api/subcategory/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errors) {
              console.log(data.errors, "error");
            } else {
              console.log(data, "data");
              getDiscout();
            }
          });
      } catch (error) {
        console.log(error);
      }
    };
    hendlepic();
  };
  const renderTitle = (title: string) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  //Delete

  const handleDeleteProduct = (index: number) => {
    fetch(`http://139.59.182.202/api/subcategory/${index}`, {
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
          getDiscout();
        }
      });
    console.log(index);
  };

  //Modal

  const handleModal = () => {
    setModal("hidden");
    //     productIdEdit.current.value =""
    // percentEdit.current.value =""
    // end_timeEdit.current.value =""
  };

  const hendlEdit = () => {
    setModal("block");
  };

  return (
    <>
      <div className="container">
        <div>
          <h1 className="header fount p-5">Discount</h1>
        </div>
        <div className="body_Wrapper">
          <form className="pl-8 mb-20 p-8" onSubmit={handleSubmit}>
            <h2 className="form_title fount mb-8">Add new discount</h2>
            <ol className="flex items-center flex-wrap justify-between mb-8">
              <li>
                <label className="block fount">Category name</label>
                <select
                  ref={productId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Category
                  </option>
                  {product?.map((el: any) => (
                    <option value={el?.id}>{el?.category_name}</option>
                  ))}
                </select>
              </li>

              <li>
                <label className="block fount">Catalog name</label>
                <select
                  ref={percent}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Category
                  </option>
                  {catalog?.map((el: any) => (
                    <option value={el?.id}>{el?.catalog_name}</option>
                  ))}
                </select>
              </li>

              <li>
                <label className="block fount">Subcategory name</label>
                <input
                  ref={end_time}
                  type="text"
                  className="w-80 p-3 rounded-lg text-black focus:outline-none focus:ring"
                  placeholder="Subcategory name"
                />
              </li>
            </ol>

            <div className="ml-auto">
              <button
                className="submit h-12 bg_fount text-center rounded-lg"
                type="submit"
              >
                Qo’shish
              </button>
            </div>
          </form>
          <div className="p-8">
            <div className=" mb-8">
              <h2 className="form_title pl-8 fount ">
                Bizning subcategoriyalarimiz
              </h2>
            </div>

            {/* product */}
            <ol className="m-0 p-0  flex flex-wrap gap-5 ">
              {discountProduct?.map((el: any) => (
                <li className="list_item  max-w-[250px] min-w-[250px] border mt-8 rounded-xl bg-white drop-shadow-lg ">
                  <div className=" p-3">
                    <h4 className="text-sm text-black max-w-[200px] font-bold pl-1 ">
                      subcategory_name: {renderTitle(el?.subcategory_name)}
                    </h4>
                    <p className="text-sm text-black font-bold pl-1 mt-2 ">
                      productlar soni: {el?.products?.length} <br />
                    </p>
                    <p className="text-sm text-black font-bold pl-1 mt-2 mb-8">
                      brandlar soni: {el?.brands?.length} <br />
                    </p>

                    <div className="flex items-center ml-auto">
                      <button
                        onClick={() => {
                          hendlEdit();
                          setId(el?.id);
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
                        onClick={() => handleDeleteProduct(el?.id)}
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
          </div>
        </div>
        {/* Modal */}
        <div className={`border-black madal ${modal}`}>
          <button
            onClick={() => handleModal()}
            className="madal_button ml-auto block border-5 border-blue"
            type="button"
          >
            x
          </button>

          <form className="pl-8 mb-20 p-8" onSubmit={EditSubmit}>
            <h2 className="form_title fount mb-8">Edir discount</h2>
            <ol className="flex items-center flex-wrap justify-between mb-8">
              <li>
                <label className="block fount">Category name</label>
                <select
                  ref={productIdEdit}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Category
                  </option>
                  {product?.map((el: any) => (
                    <option value={el?.id}>{el?.category_name}</option>
                  ))}
                </select>
              </li>

              <li>
                <label className="block fount">Catalog name</label>
                <select
                  ref={percentEdit}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Category
                  </option>
                  {catalog?.map((el: any) => (
                    <option value={el?.id}>{el?.catalog_name}</option>
                  ))}
                </select>
              </li>

              <li>
                <label className="block fount">Subcategory name</label>
                <input
                  ref={end_timeEdit}
                  type="text"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Subcategory name"
                />
              </li>
            </ol>
            <div className="ml-auto  ">
              <button
                onClick={() => handleModal()}
                className="submit mx-auto h-12 bg_fount text-center rounded-lg"
                type="submit"
              >
                Qo’shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
