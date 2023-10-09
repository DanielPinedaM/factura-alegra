import Spinner from '../../assets/Spinner';
import { useCounters } from '../../hooks/useCounters';
import { useSellers } from '../../hooks/useSellsers';
import CreateReceipt from './../Receipt/CreateReceipt';

interface IGetAllSellers {
  idCustomer: string;
  idProduct: string;
}

const GetAllSellers = ({ idCustomer, idProduct }: IGetAllSellers) => {
  const { handleFetch, loading, isFetching, sellers } = useSellers();
  const { counters, handleIncrement, winner, counterAccumulator } = useCounters(sellers);

  const RenderSellers: React.FC = () => {
    return (
      <ul className='text-white grid grid-cols-1 xsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-[2%] gap-y-4 items-center justify-center self-center'>
        {sellers?.map((seller, i: number) => (
          <li
            className='min-h-[370px] flex flex-col flex-nowrap justify-center  border border-white py-5 px-[2%] md:px-[1.5%] rounded-xl'
            key={seller?.id ?? i}
          >
            <div className='gap-y-2 flex-nowrap flex flex-col items-center content-center justify-center h-full'>
              <img src={`https://robohash.org/${seller?.name ?? i}.png`} alt='RoboHash' />
              <p className='block w-full text-center'>
                <span className='font-bold'>ID vendedor: </span>
                <span>{seller.id}</span>
              </p>
              <hr className='block w-full' />
              <p className='block w-full text-left'>
                <span className='font-bold'>Nombre vendedor: </span>
                <span>{seller.name}</span>
              </p>
              <p className='block w-full text-left'>
                <span className='font-bold'>Total puntos: </span>
                <span>{counters[seller?.id] ?? 0}</span>
              </p>
              {/* los id auto-incrementables del Alegra endpoint vendedor SIEMPRE empiezan en 1, lo cual es un valor truthy (1, 2, 3...) */}
              {winner && winner === seller.id ? (
                <p className='block w-full italic font-black text-center uppercase'>
                  id vendedor ganador (seller): {winner}
                </p>
              ) : (
                <p className='block w-full text-left'>
                  Puntos restantes para ganar: {20 - (counters[seller?.id] ?? 0)}
                </p>
              )}
              <button
                className={`${winner ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} 
                w-full block bg-[#04b39b] text-white px-3 py-2 rounded-lg font-bold hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
                type='button'
                onClick={() => handleIncrement(seller.id)}
                disabled={Boolean(winner)}
              >
                Seleccionar <span className='font-bold'>+3</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className='bg-[#3b454c] px-[5%] py-3 mb-5'>
        <h1 className='sm:text-3xl mb-5 text-2xl font-semibold text-white'>
          4) Listar todos los vendedores
        </h1>
        <p className='font-bold text-[#f04c58] mb-1.5'>
          El vendedor ganador es el que despues de presionar varias veces boton Seleccionar acumula
          20 puntos o más
        </p>
        <p className='font-bold text-[#f04c58] mb-1.5'>
          Dar clic en ver para listar nuevos vendedores
        </p>
        <button
          className={`${
            loading ? 'cursor-not-allowed' : 'cursor-pointer'
          } mb-3 bg-[#04b39b] block w-fit mx-auto text-white px-3 py-2 rounded-lg font-bold hover:bg-[#047c73] transition-all duration-300 active:relative active:top-0.5`}
          type='button'
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? <Spinner /> : <span>ver</span>}
        </button>

        {sellers?.length > 0 && isFetching && !loading && <RenderSellers />}
        {sellers?.length === 0 && isFetching && !loading && (
          <p>NO hay vendedores, crea un nuevo vendedor</p>
        )}
      </div>

      <CreateReceipt
        counterAccumulator={counterAccumulator}
        winner={winner}
        idCustomer={idCustomer}
        idProduct={idProduct}
      />
    </>
  );
};

export default GetAllSellers;
