import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';
import Erro from '../Help/Error';

import styles from './UserPhotopost.module.css'
import { useNavigate } from 'react-router-dom';

type ImageState = {
  preview: string;
  raw: File | null;
};

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');

  const [img, setImg] = React.useState<ImageState>({
    preview: '',
    raw: null,
  });

  const { data, error, loading, request } = useFetch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if(data) navigate('/conta');
  }, [data, navigate])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!img.raw) return;

    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');
    if (!token) return;

    const { url, options } = PHOTO_POST(token, formData);
    request(url, options);
  }

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImg({
      preview: URL.createObjectURL(file),
      raw: file,
    });
  }

  return (
    <section className="animeLeft grid grid-cols-[1fr_1fr] gap-8 mb-8">
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <Input
          label="Imagem"
          type="file"
          error={error}
          name="img"
          onChange={handleImgChange}
          className='mb-8'
        />
        <Button disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
        <Erro error={error}/>
      </form>

      {img.preview && (
        <div
          className={`${styles.preview} rounded-2xl bg-cover bg-center`}
          style={{ backgroundImage: `url(${img.preview})` }}
        />
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};

export default UserPhotoPost;