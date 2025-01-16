export const getTokenByLocalStorage = (): string | null => {
   return localStorage.getItem('access_token');
};

export const setTokenByLocalStorage = (value: string) => {
   localStorage.setItem('access_token', value);
}