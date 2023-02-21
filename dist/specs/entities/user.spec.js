"use strict";
// // src/specs/entities/user.ts
// import * as chai from "chai";
// import * as chaiAsPromised from "chai-as-promised";
// import { AppDataSource } from "../../lib/typeorm";
// import { User } from "../../entities/User";
// import { QueryFailedError, InsertResult } from "typeorm";
// import { expect } from "chai";
// import { ValidationError } from "../entities/ValidationError";
// chai.use(chaiAsPromised);
// describe("User", function () {
//   before(async function () {
//     // TODO: initialise the datasource (database connection)
//     await AppDataSource.initialize();
//   });
//   beforeEach(async function () {
//     // TODO: drop the content of the user table between each it().
//     await AppDataSource.createQueryBuilder().delete().from(User).execute();
//   });
//   describe("validations", function () {
//     it("should create a new User in database", async function () {
//       const repositoryUser = AppDataSource.getRepository(User);
//       const user = new User();
//       user.firstName = "Hoang";
//       user.lastName = "NGUYEN";
//       user.email = "hoangnguyen@gmail.com";
//       user.passwordHash = "thispassword";
//       await repositoryUser.save(user);
//       const newUser = new User();
//       newUser.firstName = "Hoang";
//       newUser.lastName = "NGUYEN";
//       newUser.email = "hoangnguyen@gmail.com";
//       newUser.passwordHash = "thispassword";
//       expect(newUser).to.deep.equal(user);
//     });
//     it("should raise error if email is missing", async function () {
//       // hint to check if a promise fails with chai + chai-as-promise:
//       // await chai.expect(promise).to.eventually.be.rejectedWith(QueryFailedError, "message")
//       const user = new User();
//       user.firstName = "Hoang";
//       user.lastName = "NGUYEN";
//       user.passwordHash = "Hoang";
//       const promise = AppDataSource.manager.save(user);
//       await chai
//         .expect(promise)
//         .to.eventually.be.rejectedWith(
//           Error,
//           "The email need to be specified"
//         );
//     });
//     // it("should raise error if required properties are missing", async function () {
//     //   const user = new User();
//     //   user.lastName = "NGUYEN";
//     //   user.email = "hoangnguyen@gmail.com";
//     //   user.passwordHash = "Hoang";
//     //   const repositoryUser = AppDataSource.getRepository(User);
//     //   // await expect(repositoryUser.save(user))
//     //   //   .to.eventually.be.rejectedWith(
//     //   //     Error,
//     //   //     "The firstname need to be specified"
//     //   //   )
//     //   //   .and.include({ target: user, property: "firstname" });
//     //   await expect(repositoryUser.save(user)).to.eventually.be.rejected.and.deep.include({
//     //     target: user,
//     //     property: "firstName",
//     //     constraints: { isNotEmpty: "firstName should not be empty" },
//     //   });
//     // });
//     it("should raise error if email is not unique", async function () {
//       const repositoryUser = AppDataSource.getRepository(User);
//       const user1 = new User();
//       user1.firstName = "Hoang";
//       user1.lastName = "NGUYEN";
//       user1.email = "hoangnguyen@gmail.com";
//       user1.passwordHash = "thispassword";
//       await repositoryUser.save(user1);
//       const user2 = new User();
//       user2.firstName = "Hoang";
//       user2.lastName = "NGUYEN";
//       user2.email = "hoangnguyen@gmail.com";
//       user2.passwordHash = "thispassword";
//       await chai
//         .expect(repositoryUser.save(user2))
//         .to.eventually.be.rejectedWith(Error, 'Should use another email');
//     });
//   });
// });
