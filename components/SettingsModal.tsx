import { FC } from 'react';
import type { User } from 'next-auth';
import { AvatarPicker } from './Forms/FormComponents';
import { SettingsForm } from './Forms/SettingsForm';
import { Modal } from './Modal';

type SettingsModalProps = {
  user: User;
  toggleModal: () => void;
};
const SettingsModal: FC<SettingsModalProps> = props => {
  return (
    <Modal
      close={props.toggleModal}
      className="flex w-full max-w-4xl flex-col gap-7 p-7 md:flex-row"
    >
      <AvatarPicker user={props.user} className="mx-auto w-40" />
      <div className="flex flex-grow flex-col gap-y-7">
        <SettingsForm {...props} />
      </div>
    </Modal>
  );
};

export default SettingsModal;
