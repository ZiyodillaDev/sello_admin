"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import "./report.css";
import icon from "../../../public/images/icon.png";

export default function Reports(): JSX.Element {
  const [product, setProduct] = useState([]);
  const [sello, setSello] = useState([0]);
  const [user, setUser] = useState([0]);
  const [brend, setBrend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://139.59.182.202/api/product");
        const data1 = await response1.json();
        setProduct(data1);

        const response2 = await fetch("http://139.59.182.202/api/discount");
        const data2 = await response2.json();
        setSello(data2.data);

        const response3 = await fetch("http://139.59.182.202/api/user");

        const data3 = await response3.json();
        setUser(data3.data);

        const response4 = await fetch("http://139.59.182.202/api/brand");

        const data4 = await response4.json();
        setBrend(data4.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(brend);
  console.log(user);
  console.log(sello);
  console.log(user);

  return (
    <>
      <div className="container">
        <div>
          <h1 className=" header fount p-5">Xisobot</h1>
          <div className="p-8">
            <div className=" pb-5 w-full flex gap-5">
              <div className=" students p-5 border-solid bg-white border-2 rounded-[12px] drop-shadow-lg">
                <p className="count fount pb-5">Total count of products:</p>
                <strong className="strong">{product.length}ta</strong>

                <Image
                  className="block ml-auto"
                  src={icon}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className=" students p-5 bg-white border-solid  border-2 rounded-[12px] drop-shadow-lg">
                <p className="count fount pb-5">Count of users</p>
                <strong className="strong">1 ta</strong>
                <Image
                  className="block ml-auto"
                  src={icon}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
            </div>
            <div className=" w-full flex gap-5">
              <div className=" students p-5 bg-white border-solid border-2 rounded-[12px] drop-shadow-lg">
                <p className="count fount pb-5">Partner brands</p>
                <strong className="strong">{brend.length}ta</strong>
                <Image
                  className="block ml-auto"
                  src={icon}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className=" students p-5 bg-white border-solid border-2 rounded-[12px] drop-shadow-lg">
                <p className="count fount pb-5">Discount products</p>

                <strong className="strong">{sello.length} ta</strong>

                <Image
                  className="block ml-auto"
                  src={icon}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
