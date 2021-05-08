import { Resolver, Query } from "type-graphql";
import { AuthenticationMsg } from '../models';

@Resolver()
export class AuthenticationResolver {
  @Query(()=> AuthenticationMsg)
  hello(){
    return {
      status: "OK",
      jwtToken: "YOLO"
    }
  }
}