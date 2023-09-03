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
        const response2 = await fetch("http://139.59.182.202/api/product");
        const data2 = await response2.json();
        setProduct(data2);
        const responseDiscount = await fetch(
          "http://139.59.182.202/api/discount"
        );
        const data3 = await responseDiscount.json();
        setDiscountProduct(data3?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const getDiscout = async () => {
    const responseDiscount = await fetch("http://139.59.182.202/api/discount");
    const data3 = await responseDiscount.json();
    setDiscountProduct(data3?.data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const hendlepic = async () => {
      const data = {
        product_id: +productId.current.value,
        percentage: +percent.current.value,
        end_time: end_time.current.value,
      };
      console.log(data);

      try {
        fetch("http://139.59.182.202/api/discount", {
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
        product_id: +productIdEdit.current.value,
        percentage: +percentEdit.current.value,
        end_time: end_timeEdit.current.value,
      };
      console.log(data, "edit");

      try {
        fetch(`http://139.59.182.202/api/discount/${id}`, {
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
    fetch(`http://139.59.182.202/api/discount/${index}`, {
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
  console.log(id, "id");

  //Modal

  const handleModal = () => {
    setModal("hidden");
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
                <label className="block fount">ProductName</label>
                <select
                  ref={productId}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Product
                  </option>
                  {product?.map((el: any) => (
                    <option value={el?.id}>{el?.title}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block fount">Percent</label>
                <input
                  ref={percent}
                  type="number"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Percent"
                />
              </li>
              <li>
                <label className="block fount">End_time</label>

                <input
                  ref={end_time}
                  type="date"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="categoryName"
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
                Bizning chegirmadagi mollarimiz
              </h2>
            </div>

            {/* product */}
            <ol className="m-0 p-0  flex flex-wrap gap-5 ">
              {discountProduct?.map((el: any) => (
                <li className="list_item  max-w-[250px] min-w-[250px] border mt-8 rounded-xl bg-white drop-shadow-lg ">
                  <Image
                    className="inline w-full h-[250px]  rounded-xl p-1"
                    src={`http://139.59.182.202//${el?.product?.product_image}`}
                    alt=""
                    width="200"
                    height="300"
                  />

                  <div className=" p-3">
                    <p className="text-sm max-w-[200px] font-bold pl-1 ">
                      {renderTitle(el?.product?.title)}
                    </p>
                    <del className="text-sm font-bold pl-1  mb-8">
                      {el?.product?.price} so'm <br />
                    </del>

                    <p className="text-sm font-bold pl-1 text-cyan-700 mb-8">
                      {el?.product?.price -
                        (el?.product?.price * el?.percentage) / 100}{" "}
                      so'm, chegirma {el?.percentage}%
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
                <label className="block fount">ProductName</label>
                <select
                  ref={productIdEdit}
                  className="hidden_pleceholder w-80 p-3 rounded-lg focus:outline-none focus:ring"
                >
                  <option value="" disabled hidden>
                    Product
                  </option>
                  {product?.map((el: any) => (
                    <option value={el?.id}>{el?.title}</option>
                  ))}
                </select>
              </li>
              <li>
                <label className="block fount">Percent</label>
                <input
                  ref={percentEdit}
                  type="number"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="Percent"
                />
              </li>
              <li>
                <label className="block fount">End_time</label>

                <input
                  ref={end_timeEdit}
                  type="date"
                  className="w-80 p-3 rounded-lg focus:outline-none focus:ring"
                  placeholder="categoryName"
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
