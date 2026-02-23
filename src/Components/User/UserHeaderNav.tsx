import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import useMedia from "../../Hooks/UseMedia";

const UserHeaderNav = () => {
  const navigate = useNavigate();
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { pathname } = useLocation();

  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("userLogout precisa estar dentro de UserStorage");
  }

  const { userLogout } = context;

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  const baseItem = `
  place-items-center
    bg-[#eee]
    rounded-[0.2rem]
    h-10 w-10
    flex items-center justify-center
    border border-transparent
    transition-all duration-100
    cursor-pointer
    hover:bg-white
    hover:shadow-[0_0_0_3px_#eee]
    hover:border-[#333]
    focus:bg-white
    focus:shadow-[0_0_0_3px_#eee]
    focus:border-[#333]
    outline-none
  `;

  const activeItem = `
    aria-[current=page]:bg-white
    aria-[current=page]:shadow-[0_0_0_3px_#fea]
    aria-[current=page]:border-[#fb1]
    aria-[current=page]:text-[#fb1]
  `;

  return (
    <>
      {/* MOBILE BUTTON */}
      {mobile && (
        <button
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          className={`
            ${baseItem}
            ${mobileMenu ? "bg-white shadow-[0_0_0_3px_#fea] border-[#fb1] text-[#fb1]" : ""}
            relative
            after:content-['']
            after:block
            after:w-[1.2rem]
            after:h-[2px]
            after:bg-current
            after:rounded
            after:shadow-[0_6px_currentColor,0_-6px_currentColor]
            after:transition-all
            place-items-center
            ${mobileMenu ? "after:rotate-90 after:w-[4px] after:h-[4px] after:shadow-[0_8px_currentColor,0_-8px_currentColor]" : ""}
          `}
        />
      )}

      {/* NAV */}
      <nav
        className={
          mobile
            ? `
              absolute top-[70px] right-0
              p-[0_1rem]
              bg-white
              shadow-[0_1px_2px_rgba(0,0,0,0.2)]
              rounded-[0.2rem]
              transition-all duration-300
              ${
                mobileMenu
                  ? "translate-x-0 opacity-100 pointer-events-auto z-50"
                  : "-translate-x-[10px] opacity-0 pointer-events-none"
              }
            `
            : "grid grid-cols-4 gap-4"
        }
      >
        <NavLink
          to="/conta"
          end
          className={`${baseItem} ${activeItem} ${
            mobile
              ? "w-full border-none border-b border-[#eee] bg-transparent justify-start gap-2 px-0 py-2"
              : ""
          }`}
        >
          <MinhasFotos className="fill-current" />
          {mobile && "Minhas Fotos"}
        </NavLink>

        <NavLink
          to="/conta/estatisticas"
          className={`${baseItem} ${activeItem} ${
            mobile
              ? "w-full border-none border-b border-[#eee] bg-transparent justify-start gap-2 px-0 py-2"
              : ""
          }`}
        >
          <Estatisticas className="fill-current" />
          {mobile && "Estatísticas"}
        </NavLink>

        <NavLink
          to="/conta/postar"
          className={`${baseItem} ${activeItem} ${
            mobile
              ? "w-full border-none border-b border-[#eee] bg-transparent justify-start gap-2 px-0 py-2"
              : ""
          }`}
        >
          <AdicionarFoto className="fill-current" />
          {mobile && "Adicionar Foto"}
        </NavLink>

        <button
          onClick={handleLogout}
          className={`${baseItem} ${
            mobile
              ? `
              flex items-center gap-2 
              w-full
              border-none
              border-b border-[#eee]
              bg-transparent
              px-0 py-2
              text-left
              whitespace-nowrap
              `
              : baseItem
          }`}
        >
          <Sair className="fill-current shrink-0 inline mr-2" />
          {mobile && <span>Sair</span>}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
