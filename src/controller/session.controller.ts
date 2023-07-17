import { Request, Response } from "express";
import { createSession, validatePassword } from "../service/session.service";
import { signJWT } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the user's password
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send("invalid email or password!!");
  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // create an access token
  const accessToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") }
  );
  // create a refresh token
  const refreshToken = signJWT(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );
  // return access and refresh token
  return res.send({ accessToken, refreshToken });
}
