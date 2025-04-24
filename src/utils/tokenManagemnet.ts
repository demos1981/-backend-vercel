import { RefreshToken } from "../models/refreshTokens.entity";

export const storeRefreshToken = async (userId: number, token: string) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  await RefreshToken.save({
    userId,
    token,
    expiryDate,
  });
};

export const retrieveRefreshToken = async (
  token: string
): Promise<string | null> => {
  const refreshToken = await RefreshToken.findOne({
    where: { token },
  });
  if (!refreshToken || refreshToken.expiryDate <= new Date()) return null;
  return refreshToken.token;
};

export const removeRefreshToken = async (token: string) => {
  await RefreshToken.delete({ token });
};
