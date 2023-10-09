import { useState } from 'react';
import { ISeller } from '../types/receipt';

interface IOptionGetAllSellers {
  method: string;
  headers: {
    accept: string;
    authorization: string;
  };
}

export const useSellers = () => {
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const endpointAlegra: string = import.meta.env.VITE_ENDPOINT_SELLER_ALEGRA;
  const authorization: string = import.meta.env.VITE_API_KEY_ALEGRA;

  const handleFetch = async (): Promise<void> => {
    setLoading(true);
    setIsFetching(true);

    const options: IOptionGetAllSellers = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: authorization,
      },
    };

    try {
      const response = await fetch(endpointAlegra, options);
      const json = await response.json();
      setSellers(json);
      console.log('useSellers.tsx, response, listar vendedores', json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleFetch,
    loading,
    isFetching,
    sellers,
  };
};
