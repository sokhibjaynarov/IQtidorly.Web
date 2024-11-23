import React from 'react'
import "./create.scss"

import { FaAngleLeft } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import book from "../../../../assets/images/book.png"
import blaknoot from "../../../../assets/images/blaknoot.png"


const Create = () => {
  return (
    <>
        <div id="create">
            <div className=" test">
                <div className="test__right">
                    <FaAngleLeft/> <p>Mening savollarim</p>
                </div>
                <NavLink to={"addtest"} className="test__left">
                    <FiPlus/> <span>Yangi test qo’shish</span>
                </NavLink>
            </div>
            <div className="create">
                <h2 className="create__title">
                    Yangi test yaratish
                </h2>
                <div className="create__main">
                    <div className="create__left">
                        <img src={book} alt="" />
                        <h2>Testlar kutubxonasidan foydalanish</h2>
                        <p>Yangi testlar yaratish uchun “Yangi test qo’shish” tugmasini bosing</p>
                    </div>
                    <div className="create__right">
                        <img src={blaknoot} alt="" />
                        <h2>Yangi test yaratish foydalanish</h2>
                        <p>Yangi testlar yaratish uchun “Yangi test qo’shish” tugmasini bosing</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Create