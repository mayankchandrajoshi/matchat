import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import UserModal from "./UserModal";
import { mockUserAbout, mockUserEmail, mockUserImage, mockUserName, mockUserStatus } from "../../../constants/test/auth";


describe("User Modal", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        await UserModal.syncIndexes();
    });

    afterEach(async () => {
        await UserModal.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it("should create and save a user document successfully", async () => {
        const userData = { email: mockUserEmail, username: mockUserName, image: mockUserImage, about: mockUserAbout, status: mockUserStatus};
        const user = new UserModal(userData);
        const savedUser = await user.save();

        expect(savedUser.email).toBe(mockUserEmail);
        expect(savedUser.username).toBe(mockUserName);
        expect(savedUser.image).toBe(mockUserImage);
        expect(savedUser.about).toBe(mockUserAbout);
        expect(savedUser.status).toBe(mockUserStatus);
        expect(savedUser.createdAt).toBeInstanceOf(Date);
        expect(savedUser.updatedAt).toBeInstanceOf(Date);
    });

    it("should enforce unique email constraint", async () => {
        const user1 = new UserModal({ email: mockUserEmail, username: mockUserName});
        const user2 = new UserModal({ email: mockUserEmail, username: mockUserName+'2'});

        await user1.save();
        await expect(user2.save()).rejects.toThrow(`E11000 duplicate key error collection: test.usermodals index: email_1 dup key: { email: "${mockUserEmail}" }`);
    });

    

})