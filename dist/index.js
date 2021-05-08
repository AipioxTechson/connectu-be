"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
let StubResolver = class StubResolver {
    hello() {
        return "Hello!";
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StubResolver.prototype, "hello", null);
StubResolver = __decorate([
    type_graphql_1.Resolver()
], StubResolver);
const main = async () => {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [StubResolver]
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
    const app = express_1.default();
    apolloServer.applyMiddleware({ app });
    app.listen(process.env.PORT || 4000, () => {
        console.log(`server started on http://localhost:${process.env.PORT || 4000}/graphql`);
    });
};
main();
//# sourceMappingURL=index.js.map