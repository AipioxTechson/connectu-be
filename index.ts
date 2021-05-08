import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";

import { AuthenticationResolver } from './resolvers';
 

const main = async () => {
  const schema = await buildSchema({
    resolvers: [AuthenticationResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT || 4000, () => {
    console.log(`server started on http://localhost:${process.env.PORT || 4000}/graphql`);
  });
};

main();