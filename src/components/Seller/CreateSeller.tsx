import { useState } from 'react';
import Spinner from './../../assets/Spinner';
import GetAllSellers from './../Seller/GetAllSellers';

interface ICreateSeller {
  idCustomer: string;
  idProduct: string;
}

interface IData {
  name: string;
  id: string;
  observations: string;
}

const initialValueDataForm: IData = {
  name: '',
  id: '',
  observations: '',
};

const CreateSeller = ({ idCustomer, idProduct }: ICreateSeller) => {
  const [dataForm, setDataForm] = useState<IData>(initialValueDataForm);
  const [loading, setLoading] = useState<boolean>(false);

  const endpointAlegra: string = import.meta.env.VITE_ENDPOINT_SELLER_ALEGRA;
  const authorization: string = import.meta.env.VITE_API_KEY_ALEGRA;

  const requestCreateSeller = async (): Promise<void> => {
    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: authorization,
      },
      body: JSON.stringify({
        name: dataForm.name,
        identification: dataForm.id,
        observations: dataForm.observations,
        status: 'active',
      }),
    };

    try {
      const response = await fetch(endpointAlegra, options);
      const json = await response.json();
      setDataForm(initialValueDataForm); // limpiar campos
      console.log('response CreateSeller.tsx', json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    /* fetch(endpointAlegra, options)
      .then((response) => response.json())
      .then((response) => {
        setDataForm(initialValueDataForm);
        console.log('response CreateSeller.tsx', response);
      })
      .catch((err) => console.error(err)); */
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;

    setDataForm((dataForm) => ({
      ...dataForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    requestCreateSeller();
  };

  return (
    <>
      <div className='bg-[#3b454c] px-[5%] py-3 mb-5'>
        <h1 className='sm:text-3xl mb-5 text-2xl font-semibold text-white'>3) Crear vendedor</h1>
        <p className='font-bold text-[#f04c58] mb-1.5'>
          Puedes crear todos los vendedores que quieras
        </p>

        <form
          className='grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 gap-x-[2%] gap-y-4'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <div>
            <label className='text-white' htmlFor='nameSeller'>
              <span>Nombre vendedor: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <input
              className='block w-full border rounded'
              type='text'
              name='name'
              id='nameSeller'
              value={dataForm.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className='text-white' htmlFor='idSeller'>
              <span>Identificación: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <input
              className='block w-full border rounded'
              type='number'
              name='id'
              id='idSeller'
              value={dataForm.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className='flex-nowrap flex flex-col'>
            <label className='text-white' htmlFor='observationsSeller'>
              <span>Obervaciones: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <textarea
              className='block w-full'
              cols={20}
              rows={4}
              id='observationsSeller'
              name='observations'
              value={dataForm.observations}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type='submit'
            className={`${
              loading ? 'cursor-not-allowed' : 'cursor-pointer'
            } col-span-full bg-[#04b39b] inline-block w-fit mx-auto text-white px-3 py-2 rounded-lg font-bold  hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
          >
            {loading ? <Spinner /> : <span>Crear</span>}
          </button>
        </form>
      </div>

      <GetAllSellers idCustomer={idCustomer} idProduct={idProduct} />
    </>
  );
};

export default CreateSeller;
