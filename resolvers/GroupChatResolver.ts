import { Resolver, Query, Arg, Mutation  } from "type-graphql";
import { GroupChat as GroupChatModel, User as UserModel } from '../database';
import { GroupChat } from '../models';
import { createGroupChatInput } from '../inputs';


@Resolver(GroupChat)
export class GroupChatResolver {

  @Query(()=> GroupChat, {nullable: true})
  async getGroupChat(@Arg("id") id: string){
    const GroupChat = await GroupChatModel.findOne({ _id: id });
    return GroupChat;
  }

  @Mutation(()=> GroupChat, {nullable: true})
  async addGroupChat(@Arg("email") email: string, @Arg("info") groupchatInfo: createGroupChatInput){
    const user = UserModel.findOne({ email });
    if (!user){
      return null;
    }
    const newGroupChat = await GroupChatModel.create({...groupchatInfo});
    await UserModel.updateOne(
      { email}, 
      { $push: { groupChatsCreated: newGroupChat._id } },
    );
    return newGroupChat;
  }

}