import { useEffect, useState } from 'react';
import { ISeller } from '../types/receipt';

interface ICountersState {
  [buttonId: string]: number;
}

export const useCounters = (sellers: ISeller[]) => {
  const [counters, setCounters] = useState<ICountersState>({});
  const [counterAccumulator, setCounterAccumulator] = useState<number>(0);
  const [winner, setWinner] = useState<number | string>('');

  useEffect(() => {
    const findWinner = (): ISeller | undefined => {
      return sellers.find((seller) => counters[seller?.id ?? 0] >= 20);
    };
    if (findWinner()) {
      setWinner(findWinner()?.id ?? '');
    } else {
      setWinner('');
    }

    const sum: number = Object.values(counters).reduce(
      (acc: number, point: number) => acc + point,
      0
    );
    setCounterAccumulator(sum);
  }, [counters, sellers]);

  const handleIncrement = (buttonId: number): void => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [buttonId]: (prevCounters[buttonId] ?? 0) + 3,
    }));
  };

  useEffect(() => {
    const sum: number = Object.values(counters).reduce(
      (acc: number, point: number) => acc + point,
      0
    );
    setCounterAccumulator(sum);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counters]);

  return {
    counters,
    handleIncrement,
    winner,
    counterAccumulator,
  };
};
