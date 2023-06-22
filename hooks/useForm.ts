import { Dispatch, SetStateAction, useState } from 'react';
import { WithFormError } from '@/types';

type Data<T> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  setError: (error: WithFormError['error']) => void;
  handleInput: (e: any) => void;
};

export const useForm = <T>(formData: T): Data<T & WithFormError> => {
  const [data, setData] = useState<T & WithFormError>({ ...formData, error: undefined });

  const handleInput: Data<null>['handleInput'] = e => {
    const { id, value } = e.target;
    setData(prevData => ({ ...prevData, [id]: value }));
  };

  const setError: Data<null>['setError'] = error => {
    setData(prevData => ({ ...prevData, error }));
  };

  return { data, setData, setError, handleInput };
};
