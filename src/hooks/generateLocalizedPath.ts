export const generateLocalizedPath = (locale: string, asPath: string) => {
  // Replace the current locale in the path with the new locale
  const currentLocalePattern = /^\/[a-z]{2}(\/|$)/;
  if (currentLocalePattern.test(asPath)) {
    return asPath.replace(currentLocalePattern, `/${locale}$1`);
  }
  return `/${locale}${asPath}`;
};