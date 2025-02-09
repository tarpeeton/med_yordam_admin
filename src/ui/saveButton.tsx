interface ButtonProps {
  onClick: () => void;
  selectedInputLang: 'ru' | 'uz' | 'en';
  className?: string;
}

const SaveButton = ({ onClick, selectedInputLang, className }: ButtonProps) => {
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
      className={`w-full rounded-[12px] bg-[#0129E3] py-[20px] text-center font-medium text-white 2xl:w-[245px] ${className || ''}`}
    >
      {getButtonText()}
    </button>
  );
};

export default SaveButton;
