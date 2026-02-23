import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    const {pathname} = location;
    switch(pathname) {
      case '/conta/estatisticas':
        setTitle('Estatística');
        break;
      case '/conta/postar':
        setTitle('Poste Sua Foto');
        break;
      default:
        setTitle('Minha Conta')
    }  
  }, [location])

  return (
    <header className='grid grid-cols-[1fr_auto] items-center mb-8 mt-4 relative'>
      <h1 className='font-secondary font-bold text-5xl my-4 relative title-decoration'>{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader