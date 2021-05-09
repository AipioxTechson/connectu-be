import { Field, InputType } from 'type-graphql';

@InputType()
export class courseInformationInput {
  @Field()
  campus: string

  @Field()
  department: string

  @Field()
  courseCode: string

  @Field()
  term: String

  @Field()
  year: Number
}

@InputType()
export class createGroupChatInput {
  @Field()
  name: String
  @Field()
  description: String
  @Field()
  isCommunity: Boolean
  @Field(() => [String])
  links: String[]
  @Field(() => courseInformationInput, {nullable: true})
  courseInformation?: courseInformationInput 

  @Field()
  status: String
}
