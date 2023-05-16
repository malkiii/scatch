import { Dispatch, SetStateAction, useState } from 'react';

type Data<T> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  handleInput: (e: any) => void;
};

export const useForm = <T>(formData: T): Data<T> => {
  const [data, setData] = useState<T>(formData);

  function handleInput(e: any) {
    const { id, value } = e.target;
    setData(prevFormData => ({ ...prevFormData, [id]: value }));
  }

  return { data, setData, handleInput };
};
