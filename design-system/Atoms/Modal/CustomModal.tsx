import ReactModal from 'react-modal';

type ModalProps = {
  open: boolean;
  handleCloseModal: () => void;
  label: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
};

export const CustomModal = ({
  open,
  handleCloseModal,
  label,
  children,
  width,
  height,
  padding,
}: ModalProps) => {
  const ModalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 50,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  };

  const className = [
    'absolute',
    'flex items-end justify-center sm:block',
    'bg-white',
    'border border-[#c7d2fe]',
    'top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2',
    'overflow-auto sm:overflow-y-auto',
    'outline-none',
    'rounded-lg',
    'shadow-xl shadow-[#c7d2fe]',
    'z-50',
    width ? width : 'w-96',
    padding ? padding : 'px-4 pt-5 sm:p-0 sm:my-8 ',
    height ? height : 'md:h-[450px]',
    'transform transition-all',
    'text-left',
  ].join(' ');

  return (
    <ReactModal
      isOpen={open}
      // onRequestClose={handleCloseModal}
      contentLabel={label}
      style={{
        overlay: ModalOverlayStyle,
      }}
      className={className}
    >
      <div className="flex flex-col items-center justify-center w-full py-4">
        {children}
      </div>
    </ReactModal>
  );
};
