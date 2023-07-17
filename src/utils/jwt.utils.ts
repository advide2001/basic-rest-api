import jwt from "jsonwebtoken";
import config from "config";

const privateKey: jwt.Secret = config.get<string>("privateKey");
const publicKey: jwt.Secret = config.get<string>("publicKey");

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}
export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
