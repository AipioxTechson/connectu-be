import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AuthenticationMsg {
  @Field()
  status: String;

  @Field()
  jwtToken: String;
}