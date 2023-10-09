import { useEffect, useState } from 'react';
import { IWinnerReceipt } from '../../types/receipt';
import Spinner from './../../assets/Spinner';
import GetReceiptById from './GetReceiptById';

interface ICreateReceipt {
  counterAccumulator: number;
  winner: number | string;
  idCustomer: string;
  idProduct: string;
}

interface IData {
  /* tipo de dato para value={dataForm[input.value]} */
  [key: string]: number | string;

  seller: number | string;
  quantity: number;
  idCustomer: string;
  idProduct: string;
  price: number;
  dueDate: string;
  date: string;
}

interface IInputs {
  key: number;
  htmlForAndId: string;
  labelText: string;
  className: string;
  type: string;
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  disabled?: boolean;
  min?: number;
}

const CreateReceipt = ({ counterAccumulator, winner, idCustomer, idProduct }: ICreateReceipt) => {
  const initialValueDataForm: IData = {
    seller: winner,
    quantity: counterAccumulator,
    idCustomer: idCustomer,
    idProduct: idProduct,
    price: 1,
    dueDate: '',
    date: '',
  };

  const [dataForm, setDataForm] = useState<IData>(initialValueDataForm);
  const [winnerReceipt, setWinnerReceipt] = useState<IWinnerReceipt | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setDataForm((dataForm) => ({
      ...dataForm,
      seller: winner,
      quantity: counterAccumulator,
      idProduct: idProduct,
    }));
  }, [winner, counterAccumulator, idProduct]);

  const endpointAlegra: string = import.meta.env.VITE_ENDPOINT_INVOICES_ALEGRA;
  const authorization: string = import.meta.env.VITE_API_KEY_ALEGRA;

  const requestCreateReceipt = async (): Promise<void> => {
    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: authorization,
      },
      body: JSON.stringify({
        client: { id: dataForm.idCustomer },
        /* producto*/
        items: [{ id: dataForm.idProduct, price: dataForm.price, quantity: dataForm.quantity }],
        dueDate: dataForm.dueDate,
        date: dataForm.date,
        /* asociar (relacionar) -> vendedor ganador y factura */
        seller: dataForm.seller,
      }),
    };

    try {
      const response = await fetch(endpointAlegra, options);
      const json = await response.json();
      setWinnerReceipt(json);
      console.log('response CreateReceipt.tsx', json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setDataForm((dataForm) => ({
      ...dataForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    requestCreateReceipt();
  };

  const inputs: IInputs[] = [
    {
      key: 0,
      htmlForAndId: 'winnerSeller',
      labelText: 'ID vendedor ganador (seller)',
      className: 'cursor-not-allowed',
      type: 'text',
      name: 'seller',
      value: 'seller',
      required: true,
      disabled: true,
    },
    {
      key: 1,
      htmlForAndId: 'quantityReceipt',
      labelText: 'Cantidad (puntos acumulados por todos los vendedores)',
      className: 'cursor-not-allowed',
      type: 'number',
      name: 'quantity',
      value: 'quantity',
      required: true,
      disabled: true,
    },
    {
      key: 2,
      htmlForAndId: 'idCustomerReceipt',
      labelText: 'ID cliente',
      className: 'cursor-not-allowed',
      type: 'text',
      name: 'idCustomer',
      value: 'idCustomer',
      required: true,
      disabled: true,
    },
    {
      key: 3,
      htmlForAndId: 'idProductReceipt',
      labelText: 'ID producto',
      className: 'cursor-not-allowed',
      type: 'text',
      name: 'idProduct',
      value: 'idProduct',
      required: true,
      disabled: true,
    },
    {
      key: 4,
      htmlForAndId: 'priceReceipt',
      labelText: 'Precio producto',
      className: `${winner ? 'cursor-text' : 'cursor-not-allowed'}`,
      type: 'number',
      name: 'price',
      value: 'price',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event),
      required: true,
      disabled: winner ? false : true,
      min: 1,
    },
    {
      key: 5,
      htmlForAndId: 'dueDateReceipt',
      labelText: 'Fecha vencimiento',
      className: `${winner ? 'cursor-text' : 'cursor-not-allowed'}`,
      type: 'date',
      name: 'dueDate',
      value: 'dueDate',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event),
      required: true,
      disabled: winner ? false : true,
    },
    {
      key: 6,
      htmlForAndId: 'dateReceipt',
      labelText: 'Fecha factura',
      className: `${winner ? 'cursor-text' : 'cursor-not-allowed'}`,
      type: 'date',
      name: 'date',
      value: 'date',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event),
      required: true,
      disabled: winner ? false : true,
    },
  ];

  return (
    <>
      <div className='bg-[#3b454c] px-[5%] py-3 mb-5'>
        <h1 className='sm:text-3xl mb-5 text-2xl font-semibold text-white'>
          5.1) Crear factura en Alegra del vendedor ganador
        </h1>
        {!winner && (
          <p className='font-bold text-[#f04c58]'>
            Para crear factura, debe haber un vendedor ganador
          </p>
        )}

        <form
          className='grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[2%] gap-y-4 items-center'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          {inputs?.map((input, i: number) => (
            <div key={input?.key ?? i}>
              <label className='text-white' htmlFor={input.htmlForAndId}>
                <span>{input.labelText} :</span>
                <span className='text-[#f04c58] font-bold'>*</span>
              </label>
              <input
                className={`${input.className} block w-full border rounded disabled:bg-slate-300`}
                type={input.type}
                name={input.name}
                id={input.htmlForAndId}
                value={dataForm[input.value]}
                onChange={input?.onChange}
                required={input.required}
                disabled={input?.disabled}
                min={input?.min}
              />
            </div>
          ))}

          <button
            type='submit'
            className={`${
              loading || !winner ? 'cursor-not-allowed' : 'cursor-pointer'
            } col-span-full bg-[#04b39b] inline-block w-fit mx-auto text-white px-3 py-2 rounded-lg font-bold hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
            disabled={loading || !winner ? true : false}
          >
            {loading ? <Spinner /> : <span>Crear</span>}
          </button>
        </form>
      </div>

      {/* Mostrar factura vendedor ganador (si existe) */}
      {winnerReceipt && Object.keys(winnerReceipt)?.length > 0 ? (
        <GetReceiptById winnerReceipt={winnerReceipt} />
      ) : (
        <p className='font-bold text-[#f04c58]'>5.2) Para ver la factura, primero debes crearla</p>
      )}
    </>
  );
};

export default CreateReceipt;
