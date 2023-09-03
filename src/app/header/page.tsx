'use client'
import { useRouter,  usePathname } from 'next/navigation';
import Image from 'next/image';
import './header.css'
import Group from '../../../public/images/Group.svg';
import menu from '../../../public/images/menu-toggle.svg';
import Home from '../../../public/images/Home.svg';
import Hat from '../../../public/images/hat.svg';
import users from '../../../public/images/users.svg';
import credit from '../../../public/images/credit.svg';
import adderss from '../../../public/images/address.svg';
import product from '../../../public/images/new-product.png';
import {BsFillBox2Fill} from 'react-icons/bs'
import { TbBrandCodesandbox} from 'react-icons/tb'
import { RiPlayListAddLine} from 'react-icons/ri'
import { BiSolidCategoryAlt} from 'react-icons/bi'
import { MdCategory} from 'react-icons/md'
import { TbDiscount2} from 'react-icons/tb'
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="menu_bar bg_fount">
        <div className="hero_bar mb-8 p-5">
          <Image src={Group} alt="" width={48} height={48} />
          <h2 className="wrap">
            SELLO
          </h2>
          <Image src={menu} alt="" width={32} height={32} />
        </div>
        <div className="pl-5 pr-5">
          <hr />
        </div>

        <div>
          <Link href="/">
            <li className={pathname === '/' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
              <Image
                className="menu_image"
                src={Home}
                alt=""
                width={20}
                height={20}
              />
              <p className="menu_text">Report</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/product">
            <li className={pathname === '/product' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           
              <BsFillBox2Fill color="white"/>
              <p className="menu_text">Products</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/brends">
            <li className={pathname === '/brends' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
          
              <TbBrandCodesandbox color="white" style={{ width: '24px', height: '24px' }}/>
              <p className="menu_text">Brends</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/catalog">
            <li className={pathname === '/catalog' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
       
            <RiPlayListAddLine className="catalog_icon" style={{ width: '24px', height: '24px' }} />
              <p className="menu_text">Catalogs</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/category">
            <li className={pathname === '/category' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           <BiSolidCategoryAlt className="catalog_icon" style={{width: '24px', height: '24px' }}/>
              <p className="menu_text">Category</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/subcategory">
            <li className={pathname === '/subcategory' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           <MdCategory className="catalog_icon" style={{width: '24px', height: '24px' }}/>
              <p className="menu_text">Subcategory</p>
              <span className="menu_span"></span>
            </li>
          </Link>
          <Link href="/discount">
            <li className={pathname === '/discount' ? 'menu_active mb-5 pl-5' : 'menu_item mb-5 pl-5'}>
           <TbDiscount2 className="catalog_icon" style={{width: '24px', height: '24px' }}/>
              <p className="menu_text">Discount</p>
              <span className="menu_span"></span>
            </li>
          </Link>
        </div>
      </div>
    </>
  );
}