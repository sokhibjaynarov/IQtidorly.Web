import React from 'react'
import "./test.scss"

import { FaAngleLeft } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import empty from "../../../assets/images/empty.png"
import { NavLink } from 'react-router-dom';

const Test = () => {
  return (
    <>
        <div id='test'>
            <div className=" test">
                <div className="test__right">
                    <FaAngleLeft/> <p>Mening savollarim</p>
                </div>
                <NavLink to={"create"} className="test__left">
                    <FiPlus/> <span>Yangi test qo’shish</span>
                </NavLink>
            </div>
            <div className="test__empty">
                <img src={empty} alt="" />
                <h2>Sizda hozirda testlar mavjud emas!</h2>
                <p>Yangi testlar yaratish uchun “Yangi test qo’shish” tugmasini bosing</p>
                <NavLink to={"create"} className='test__left'><FiPlus/> <span>Yangi test qo’shish</span></NavLink>
            </div>
        </div>
    </>
  )
}

export default Test