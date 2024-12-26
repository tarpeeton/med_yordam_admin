export const handleBack = () => {
  if (typeof window !== 'undefined') {
    window.history.back();
  }
};