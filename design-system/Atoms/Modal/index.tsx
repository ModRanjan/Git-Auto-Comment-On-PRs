import { GiCancel } from 'react-icons/gi';
import { default as ReactModal } from 'react-modal';

type ModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  label: string;
  children: React.ReactNode;
};
export const Modal = ({
  open,
  handleCloseModal,
  label,
  children,
}: ModalProps) => {
  return (
    <div>
      <ReactModal
        isOpen={open}
        onRequestClose={handleCloseModal}
        contentLabel="Wallet Details"
        className="p-5 mx-auto mt-32 space-y-2 bg-white border rounded-lg shadow-lg md:w-2/5 shadow-indigo-200"
      >
        <div className="flex justify-between text-xl">
          <h3 className="inline-block"> {label} </h3>
          <div className="float-right">
            <button onClick={handleCloseModal}>
              <GiCancel />
            </button>
          </div>
        </div>

        {children}
      </ReactModal>
    </div>
  );
};
