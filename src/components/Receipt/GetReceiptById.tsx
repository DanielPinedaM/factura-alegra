import { IWinnerReceipt } from '../../types/receipt';

interface IGetReceiptById {
  winnerReceipt: IWinnerReceipt;
}

const GetReceiptById = ({ winnerReceipt }: IGetReceiptById) => {
  const RenderReceipt: React.FC = () => {
    return (
      <ul className='bg-slate-100 flex-nowrap gap-y-1.5 flex flex-col px-[5%] py-3 mb-5 rounded-3xl'>
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>ID factura: </span> <span>{winnerReceipt?.id}</span>
        </li>
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>ID vendedor ganador (seller): </span>
          <span>{winnerReceipt?.seller?.id}</span>
        </li>
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>Nombre vendedor ganador: </span>
          <span>{winnerReceipt?.seller?.name}</span>
        </li>
        {/* Esto funciona cuando items tiene un solo elemento, 
              por eso muestro el indice 0 usando items?.[0] */}
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>Cantidad (puntos acumulados por todos los vendedores): </span>
          <span>{winnerReceipt?.items?.[0]?.quantity}</span>
        </li>
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>ID cliente: </span>
          <span>{winnerReceipt?.client?.id}</span>
        </li>
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>Nombre cliente: </span>
          <span>{winnerReceipt?.client?.name}</span>
        </li>

        {/* lista anidada */}
        <li>
          {winnerReceipt?.items?.map((product, i: number) => (
            <ul key={i} className='flex-nowrap gap-y-1.5 flex flex-col'>
              <li className='flex-nowrap flex flex-row justify-between'>
                <span className='font-bold'>ID producto: </span> <span>{product?.id}</span>
              </li>
              <li className='flex-nowrap flex flex-row justify-between'>
                <span className='font-bold'>Precio producto: </span> <span>{product?.price}</span>
              </li>
            </ul>
          ))}
        </li>

        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>Fecha vencimiento: </span>
          <span>{winnerReceipt?.dueDate}</span>
        </li>
        <li className='flex-nowrap flex flex-row justify-between'>
          <span className='font-bold'>Fecha factura: </span>
          <span>{winnerReceipt?.date}</span>
        </li>

        <li className='mt-2 text-xs'>
          <p className='font-bold'>Terminos y condiciones:</p>
          <p>{winnerReceipt?.termsConditions}</p>
        </li>
      </ul>
    );
  };

  return (
    <>
      <h2 className='sm:text-3xl mb-5 text-2xl font-semibold text-white'>
        5.2) Ver factura vendedor ganador
      </h2>

      <RenderReceipt />
    </>
  );
};

export default GetReceiptById;
