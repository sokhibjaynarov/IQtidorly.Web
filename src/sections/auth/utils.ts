export const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
export const isPhoneNumber = (value: string) => /^\+?\d{9,}$/.test(value);
