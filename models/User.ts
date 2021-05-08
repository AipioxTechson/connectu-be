
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User{
  @Field()
  email: string

  @Field()
  status: string

  // TODO: add groupchatsCreated
}