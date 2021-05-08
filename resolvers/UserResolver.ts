import { Resolver, Query, Arg, Mutation, Authorized  } from "type-graphql";
import { User as UserModel } from '../database';
import { User } from '../models';

@Resolver()
export class UserResolver {

  @Query(()=> User, {nullable: true})
  async getUser(@Arg("email") email: string){
    const user = await UserModel.findOne({ email });
    return user;
  }

  @Authorized('admin')
  @Mutation(() => User, {nullable: true})
  async updateUser(@Arg("email") email: string,@Arg("status") status:string ){
    const user = await UserModel.findOne({ email });
    if (!user){
      return null;
    }
    user.status = status;
    const result = await user.save();
    return result;
  }
}