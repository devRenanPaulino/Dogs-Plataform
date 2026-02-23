import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg";
import Estatisticas from "../../Assets/estatisticas.svg";
import AdicionarFoto from "../../Assets/adicionar.svg";
import Sair from "../../Assets/sair.svg";

const ButtonStyle = `
  flex items-center
  gap-2 bg-[#eee]
  rounded-sm 
  h-10 w-10 
  justify-center 
  border-2 
  border-transparent 
  transition 
  cursor-pointer 
  hover:bg-white 
  focus:bg-white 
  focus:shadow-[0_0_0_3px_#eee] 
  hover:shadow-[0_0_0_3px_#eee] 
  focus:border-[#333] 
  hover:border-[#333]
  aria-[current=page]:bg-white
  aria-[current=page]:shadow-[0_0_0_3px_#FEA]
  aria-[current=page]:border-[#FB1]
`;

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState<string | null>(null);
  const context = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  if (!context) {
    throw new Error("UserHeaderNav deve estar dentro de UserStorage");
  }

  const { userLogout } = context;

  return (
    <nav className="grid grid-cols-4 gap-4">
      <NavLink to="/conta" className={`${ButtonStyle}`} end>
        <img src={MinhasFotos} />
        {mobile && <span>Estatisticas</span>}
      </NavLink>
      <NavLink to="/conta/estatisticas" className={`${ButtonStyle}`}>
        <img src={Estatisticas} />
        {mobile && <span>Estatisticas</span>}
      </NavLink>
      <NavLink to="/conta/postar" className={`${ButtonStyle}`}>
        <img src={AdicionarFoto} />
        {mobile && <span>Adicionar Foto</span>}
      </NavLink>
      <button onClick={handleLogout} className={`${ButtonStyle}`}>
        <img src={Sair} />
        {mobile && <span>Sair</span>}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
