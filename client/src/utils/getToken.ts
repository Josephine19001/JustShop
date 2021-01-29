import jwt from 'jsonwebtoken'

export const getDecodedUser = (token: any) => {
    let decoded: any = jwt.decode(token);
    return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
  };
  