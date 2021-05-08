import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { AuthenticationMsg } from '../models';
import { User } from '../database';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import "dotenv/config";
import { IUser } from "../database/schema";

@Resolver()
export class AuthenticationResolver {
  @Query(()=> AuthenticationMsg)
  async login(@Arg("email") email: string, @Arg("password") password: string){
    const user = await User.findOne({ email });
    const user2 = await User.create({email, password: await bcrypt.hash(password,10), groupChatsCreated: []});
    return {
      status: "OK",
      jwtToken: "YOLO"
    }
  }

  @Mutation(()=> AuthenticationMsg)
  async signup(@Arg("email") email: string, @Arg("password") password: string){
    const user = await User.findOne({ email });
    if (user){
      return {
        status: "USER_EXISTS"
      }
    }
    const newUser: IUser = await User.create({email, password: await bcrypt.hash(password, 10), groupChatsCreated: []});
    return {
      status: "OK",
      jwtToken: jsonwebtoken.sign(
        {email, status: `${newUser.status}` },
        `${process.env.SECRET}`,
            { expiresIn: '1y' }
          )
    }
  }
}