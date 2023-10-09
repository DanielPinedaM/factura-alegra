import { useState } from 'react';
import Spinner from './../../assets/Spinner';
import { IImg } from './../../types/img';
import CreateSeller from './../Seller/CreateSeller';

interface ICreateProduct {
  idCustomer: string;
}

/* ITEM COLOMBIA */
const CreateProduct = ({ idCustomer }: ICreateProduct) => {
  /* buscar imagen en API de Pexels */
  const [query, setQuery] = useState<string>('');
  const [img, setImg] = useState<IImg[]>([]);
  const [loadingImg, setLoadingImg] = useState<boolean>(false);
  const endpointPexels: string = import.meta.env.VITE_ENDPOINT_PEXELS;
  const authorizationPexels: string = import.meta.env.VITE_API_KEY_PEXELS;

  /* asociar (relacionar) -> id producto comprado y factura */
  const [idProduct, setIdProduct] = useState<string>('');
  const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
  const endpointAlegra: string = import.meta.env.VITE_ENDPOINT_PRODUCT_ALEGRA;
  const authorizationAlegra: string = import.meta.env.VITE_API_KEY_ALEGRA;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (): Promise<void> => {
    /* Ejecutar busqueda (fetch img) al escribir 3 caracteres o mas */
    if (query?.trim()?.length <= 2) return;

    setLoadingImg(true);

    try {
      const response = await fetch(`${endpointPexels}${query}&per_page=3`, {
        headers: {
          Authorization: authorizationPexels,
        },
      });

      if (response?.ok) {
        const data = await response.json();
        setImg(data?.photos);
        console.log('CreateProduct.tsx, response imagenes de Pexels', data?.photos);
      } else {
        console.error('Error en fetch para obtener las imagenes de Pexels API');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingImg(false);
    }
  };

  const requestCreateProduct = async (): Promise<void> => {
    setLoadingBuy(true);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: authorizationAlegra,
      },
      /* el nombre y precio del producto estan quemados
      pero tambien podria crear 2 inputs
      para permitir q el usuario los escriba */
      body: JSON.stringify({ name: 'imagen', price: 999 }),
    };

    try {
      const response = await fetch(endpointAlegra, options);
      const json = await response.json();
      setIdProduct(json?.id);
      console.log('response CreateProduct.tsx ', json);
      console.log('ID nuevo producto', json?.id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBuy(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <div className='bg-[#3b454c] px-[5%] py-3 mb-5'>
        <h1 className='sm:text-3xl mb-5 text-2xl font-semibold text-white'>2) Crear Producto</h1>

        {/* La API de Pexels sugiere mostrar su logo:
        https://www.pexels.com/es-es/api/documentation/?language=javascript#guidelines */}
        <a href='https://www.pexels.com' target='_blank' className='block w-32 mx-auto mb-3'>
          <img src='https://images.pexels.com/lib/api/pexels-white.png' loading='lazy' />
        </a>

        <form
          onSubmit={handleSubmit}
          autoComplete='off'
          className='flex-nowrap gap-y-10 flex flex-col'
        >
          <div className='flex flex-row flex-wrap items-center content-center gap-x-[2%] gap-y-4 justify-center sm:justify-start'>
            <label className=' text-white' htmlFor='product'>
              <span>Nombre producto en inglés: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <input
              className='inline-block border rounded'
              id='product'
              type='text'
              value={query}
              onChange={handleChange}
              placeholder='car, food, computer...'
              required={true}
              minLength={3}
              maxLength={16}
            />
            <button
              type='submit'
              className={`${
                loadingImg ? 'cursor-not-allowed' : 'cursor-pointer'
              } w-fit bg-[#04b39b] inline-block text-white px-3 py-2 rounded-lg font-bold  hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
              onClick={handleSearch}
              disabled={loadingImg}
            >
              {loadingImg ? <Spinner /> : <span>Buscar</span>}
            </button>
          </div>

          {img?.length > 0 && (
            <ul className='flex flex-row flex-wrap items-center content-center justify-center gap-x-[4%] gap-y-4'>
              {img?.map((imgs, i: number) => (
                <li
                  key={imgs?.id ?? i}
                  className='gap-y-2 flex flex-col border border-white p-[2%] md:p-[1.5%] rounded-xl'
                >
                  <img
                    className='rounded'
                    src={imgs?.src?.small ?? imgs?.src?.original}
                    alt={imgs?.alt ?? 'imagen de Pexels'}
                    loading='lazy'
                  />
                  <button
                    type='button'
                    onClick={requestCreateProduct}
                    className={`${
                      loadingBuy ? 'cursor-not-allowed' : 'cursor-pointer'
                    } block mx-auto  w-fit bg-[#04b39b]  text-white px-3 py-2 rounded-lg font-bold  hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
                    disabled={loadingBuy}
                  >
                    <span>Comprar</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
        {loadingBuy && (
          <div className='mt-3'>
            <Spinner />
          </div>
        )}
      </div>

      {idProduct ? (
        <CreateSeller idCustomer={idCustomer} idProduct={idProduct} />
      ) : (
        <p className='font-bold text-[#f04c58]'>Compra un solo producto para continuar</p>
      )}
    </>
  );
};

export default CreateProduct;
