import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";
 

@Resolver()
class StubResolver {
  @Query(()=> String)
  hello(){
    return "Hello The Show!"
  }
}
const main = async () => {
  const schema = await buildSchema({
    resolvers: [StubResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`server started on http://localhost:${process.env.PORT || 4000}/graphql`);
  });
};

main();