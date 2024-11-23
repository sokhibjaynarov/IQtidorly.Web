import React from 'react'
import "./header.scss"

import { IoMenu } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import person from "../../assets/images/person.png"

const header = () => {
  return (
    <div>
        <header className='header'>
            <button className="hamburger"><IoMenu/></button>
            <div className="header__person">
                {/* <h2 className="header__title">John Doe</h2>
                <svg
                className="header__person-img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                >
                <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
                </svg> */}
                <div className="header__end">
                  <div className='header__end__role'>
                    <FaBell className='header__bell'/>
                    <p className="header__number">0</p>
                  </div>
                  <div className="header__role">
                    <img src={person} alt="" />
                    <div>
                      <h2 className="header__role__name">
                        Muzaffar Fozilov
                      </h2>
                      <p>O’qituvchi</p>
                    </div>
                  </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default header