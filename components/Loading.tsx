import { FC } from 'react';
import { CgSpinner as Spinner } from 'react-icons/cg';

export const SpinnerAnimation: FC<{ size: number }> = ({ size }) => {
  return <Spinner size={size} className="animate-spin" />;
};

export const PulseAnimation: FC = () => {
  return (
    <div className="flex items-center justify-center gap-x-3">
      <span className="loading-circle animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_.00s_infinite]"></span>
      <span className="loading-circle animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_.25s_infinite]"></span>
      <span className="loading-circle animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_.50s_infinite]"></span>
      <span className="loading-circle animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_.75s_infinite]"></span>
    </div>
  );
};
