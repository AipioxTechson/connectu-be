import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import mongoose from 'mongoose';
import "dotenv/config";

import { AuthenticationResolver } from './resolvers';
 
mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


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