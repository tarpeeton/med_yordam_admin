interface ButtonProps {
  onClick: () => void;
  selectedInputLang: 'ru' | 'uz' | 'en';
}

const SaveButton = ({ onClick, selectedInputLang }: ButtonProps) => {
  const getButtonText = () => {
    switch (selectedInputLang) {
      case 'ru':
        return 'Сохранить изменения';
      case 'uz':
        return 'O‘zgarishlarni saqlash';
      default:
        return 'Save changes';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-[12px] bg-[#0129E3] py-[18px] text-center font-medium text-white 2xl:w-[256px]`}
    >
      {getButtonText()}
    </button>
  );
};

export default SaveButton;
