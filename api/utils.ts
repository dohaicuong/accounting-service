import * as bcrypt from 'bcrypt'
const saltRounds = 10
export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err) reject(err)
      resolve(hash)
    })
  })
}
export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if(err) reject(err)
      resolve(result)
    })
  })
}

import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from './configs'
export type TokenPayload = {
  sub: string
}
export const signToken = (payload: TokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, (err, token) => {
      if(err) reject(err)
      resolve(token)
    })
  })
}
export const getTokenPayload = (token: string | null): TokenPayload => {
  const dm = token as unknown
  const tokenPayload = dm as TokenPayload
  return tokenPayload
}