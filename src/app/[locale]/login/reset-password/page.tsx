import Main from '@/components/Auth/Code/Main'




export default function RegisterHome() {
  return (
   <Main title={{ru: 'Введите код из СМС, для сброса текущего пароля' , uz: "Joriy parolni ozgartirish uchun SMS-dan kodni kiriting" , en: "Enter the code from the SMS to reset the current password"}} linkBack='login' type='reset' />
  );
}
