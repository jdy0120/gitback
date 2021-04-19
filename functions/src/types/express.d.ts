/**
 * express에 res.user라는 object key의 type이 지정되어있지 않기 때문에 임의로 user의 타입을 선언해줬다.
 */
declare namespace Express {
  export interface Request {
    user?: string|object
  }
}