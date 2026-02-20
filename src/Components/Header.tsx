import React from "react";
import { Link } from "react-router-dom";
import Dogs from "../Assets/dogs.svg?react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className="shadow-sm fixed w-full z-50 bg-white top-0">
      <nav className="layout-content max-w-4xl px-4 mx-auto flex justify-between items-center h-16">
        <Link to="/" aria-label="Dogs - Home" className="px-2">
          <Dogs />
        </Link>
        <Link
          to="/login"
          className={`${styles.login} text-[#333] flex items-center`}
        >
          Login / Criar
        </Link>
      </nav>
    </header>
  );
};

export default Header;
