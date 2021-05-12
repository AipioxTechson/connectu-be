import { Resolver, Query, Arg, Mutation, Authorized, FieldResolver, Root  } from "type-graphql";
import { User as UserModel, GroupChat as GroupChatModel } from '../database';
import { User } from '../models';
import { escapeRegex } from "../helpers";


export interface UserState extends Omit<User, "groupChatsCreated"> {
  groupChatsCreated: [String]
}
@Resolver(User)
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

  @Query(() => [User], {nullable: "itemsAndList"})
  async getUsersByStatus(@Arg("status") status: string){
    const users = await UserModel.find({ status });
    return users;
  }

  @FieldResolver()
  async groupChatsCreated(@Root() user: UserState){
    return user.groupChatsCreated.map(async groupChatId => await GroupChatModel.findById(groupChatId))
  }

  @Query(() => [User], { nullable: true })
  async searchUsers(
    @Arg("text", {nullable: true}) text?: string,
  ) {
    let queryObj = {};
    if (text != undefined){
      const regex = new RegExp(escapeRegex(text), "gi");
      queryObj = { email: regex };
    }
    const users = await UserModel.find(queryObj).limit(10);
    return users;
  }
}