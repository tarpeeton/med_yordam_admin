import Main from '@/components/Auth/Code/Main'




export default function RegisterHome() {
  return (
    <Main title={{ru: 'На ваш номер отправлено письмо с подтверждением' , uz: "Raqamingizga tasdiqlash kodi yuborildi" , en: "A confirmation email has been sent to your number"}} linkBack='login' type='login' />
  );
}
