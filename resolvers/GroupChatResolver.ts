import { Resolver, Query, Arg, Mutation  } from "type-graphql";
import { GroupChat as GroupChatModel, User as UserModel } from '../database';
import { GroupChat } from '../models';
import { createGroupChatInput } from '../inputs';
import { GroupChatPaginiated } from "../models/Groupchat";


@Resolver(GroupChat)
export class GroupChatResolver {
  pageSize = 8;

  @Query(() => GroupChatPaginiated)
  async getGroupChats(@Arg("page", {nullable: true}) page: number = 0){
    const groupChats = await GroupChatModel.find().skip(page * this.pageSize).limit(this.pageSize);
    const totalCount = await GroupChatModel.find().countDocuments();
    return {groupChats, totalPages: Math.ceil(totalCount / this.pageSize) - 1 , pageNumber: page};
  }
  @Query(()=> GroupChat, {nullable: true})
  async getGroupChat(@Arg("id") id: string){
    const GroupChat = await GroupChatModel.findOne({ _id: id });
    return GroupChat;
  }

  @Query(()=> [GroupChat], {nullable: true})
  async getGroupChatByStatus(@Arg("status") status:string){
    const GroupChat = await GroupChatModel.find({ status });
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

  @Mutation(()=> GroupChat, {nullable: true})
  async updateGroupChat(@Arg("id") id: string, @Arg("status") status: string){
    const groupChat = await GroupChatModel.findOne({ _id: id });
    if (!groupChat){
      return null;
    }
    groupChat.status = status;
    const result = await groupChat.save();
    return result;
  }

}