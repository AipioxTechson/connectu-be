
import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class CourseInformation{
  @Field()
  campus?: string;
  
  @Field()
  department?: string;
  
  @Field()
  code?: Number;

  @Field()
  term?: string;

  @Field()
  year: Number;
}

@ObjectType()
export class GroupChat{
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => [String])
  links: String[]

  @Field()
  isCommunity: Boolean

  @Field(() => CourseInformation, {nullable: true})
  courseInformation?: CourseInformation

  @Field()
  status: string
}