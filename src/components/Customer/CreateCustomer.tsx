import { useState } from 'react';
import { ICustomer } from '../../types/customer';
import Spinner from './../../assets/Spinner';
import CreateProduct from './../Product/CreateProduct';

import logoAlegra from './../../assets/logoAlegra.png';

interface IData {
  firstName: string;
  lastName: string;
  idCustomer: string;
  idType: string;
  kindOfPerson: string;
  regime: string;
  status: string;
}

const initialValueDataForm: IData = {
  firstName: '',
  lastName: '',
  idCustomer: '',
  idType: '',
  kindOfPerson: '',
  regime: '',
  status: 'active',
};

/* Contacto para version Colombia con facturación electrónica */
const CreateCustomer: React.FC = () => {
  const [dataForm, setDataForm] = useState<IData>(initialValueDataForm);
  const [customer, setCustomer] = useState<ICustomer | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const endpointAlegra: string = import.meta.env.VITE_ENDPOINT_CONTACTS_ALEGRA;
  const authorization: string = import.meta.env.VITE_API_KEY_ALEGRA;

  const requestCreateCustomer = async (): Promise<void> => {
    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: authorization,
      },
      body: JSON.stringify({
        nameObject: { firstName: dataForm.firstName, lastName: dataForm.lastName },
        identificationObject: { type: dataForm.idType, number: dataForm.idCustomer },
        kindOfPerson: dataForm.kindOfPerson,
        regime: dataForm.regime,
        status: 'active',
      }),
    };

    try {
      const response = await fetch(endpointAlegra, options);
      const json = await response.json();
      setCustomer(json);
      console.log('response CreateCustomer.tsx', json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;

    setDataForm((dataForm) => ({
      ...dataForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    requestCreateCustomer();
  };

  return (
    <>
      <div className='flex justify-center my-5'>
        <a href='https://alegra.com/' target='_blank' className='w-32'>
          <img src={logoAlegra} alt='logo Alegra Facturación Electrónica y Contabilidad' />
        </a>
      </div>

      <section className='bg-[#3b454c] px-[5%] py-3 mb-5'>
        <h1 className='sm:text-3xl mb-5 text-2xl font-semibold text-white'>1) Crear cliente</h1>

        <form
          className='grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[2%] gap-y-4 items-center'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <div>
            <label className='text-white' htmlFor='firstNameCustomer'>
              <span>Nombre cliente: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <input
              className='block w-full border rounded'
              type='text'
              name='firstName'
              id='firstNameCustomer'
              value={dataForm.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='text-white' htmlFor='lastNameCustomer'>
              <span>Apellido cliente: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <input
              className='block w-full border rounded'
              type='text'
              name='lastName'
              id='lastNameCustomer'
              value={dataForm.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='text-white' htmlFor='htmlFor_idCustomer'>
              <span>Identificación cliente: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <input
              className='block w-full border rounded'
              type='number'
              name='idCustomer'
              id='htmlFor_idCustomer'
              value={dataForm.idCustomer}
              onChange={handleChange}
              required
              min={0}
            />
          </div>
          <div>
            <label className='text-white' htmlFor='htmlFor_idType'>
              <span>Tipo de identificación: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <select
              className='block w-full border rounded'
              name='idType'
              id='htmlFor_idType'
              onChange={handleChange}
              required
            >
              <option value=''>Seleccione una opción</option>
              <option value='CC'>CC</option>
              <option value='NIT'>NIT</option>
              <option value='DIE'>DIE</option>
              <option value='PP'>PP</option>
              <option value='CE'>CE</option>
              <option value='TE'>TE</option>
              <option value='TI'>TI</option>
              <option value='RC'>RC</option>
              <option value='FOREIGN_NIT'>FOREIGN_NIT</option>
              <option value='NUIP'>NUIP</option>
            </select>
          </div>
          <div>
            <label className='text-white' htmlFor='htmlFor_kindOfPerson'>
              <span>Tipo de persona: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <select
              className='block w-full border rounded'
              name='kindOfPerson'
              id='htmlFor_kindOfPerson'
              onChange={handleChange}
              required
            >
              <option value=''>Seleccione una opción</option>
              <option value='PERSON_ENTITY'>Persona natural</option>
              <option value='LEGAL_ENTITY'>Persona jurídica</option>
              <option value='OTHER_ENTITY'>Otro tipo de obligado</option>
            </select>
          </div>
          <div>
            <label className='text-white' htmlFor='htmlFor_regime'>
              <span>Regimen: </span>
              <span className='text-[#f04c58] font-bold'>*</span>
            </label>
            <select
              className='block w-full border rounded'
              name='regime'
              id='htmlFor_regime'
              onChange={handleChange}
              required
            >
              <option value=''>Seleccione una opción</option>
              <option value='COMMON_REGIME'>IVA</option>
              <option value='SIMPLIFIED_REGIME'>No IVA</option>
              <option value='NATIONAL_CONSUMPTION_TAX'>INC</option>
              <option value='NOT_REPONSIBLE_FOR_CONSUMPTION'>No INC</option>
              <option value='INC_IVA_RESPONSIBLE'>IVA e INC</option>
              <option value='SPECIAL_REGIME'>Régimen especial</option>
            </select>
          </div>

          <button
            type='submit'
            className={`${
              loading ? 'cursor-not-allowed' : 'cursor-pointer'
            }  col-span-full bg-[#04b39b] inline-block w-fit mx-auto text-white px-3 py-2 rounded-lg font-bold  hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
            disabled={loading}
          >
            {loading ? <Spinner /> : <span>Crear</span>}
          </button>
        </form>
      </section>

      {/* Crear en este orden:
      1) Cliente
      2) Producto
      3) Vendedor
      4) Factura */}
      {customer?.id ? (
        <CreateProduct idCustomer={customer.id} />
      ) : (
        <p className='font-bold text-[#f04c58]'>
          Debes crear un cliente para ver los siguientes pasos
        </p>
      )}
    </>
  );
};

export default CreateCustomer;
