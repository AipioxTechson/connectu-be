import mongoose, { Document, Schema, Model } from "mongoose";


const CourseInformationSchema: Schema = new Schema({
  campus: String,
  department: String,
  courseCode: String,
  term: {
    type: String,
    enum: ['fall', 'winter', 'summer'],
    default: 'fall',
  },
  year: Number
});
const GroupChatSchema: Schema = new Schema({
  name: String,
  description: String,
  groupchatType: {
    type: String,
    enum : ['community','course'],
    default: ['community']
  },
  courseInformation: CourseInformationSchema,
  status: {
    type: String,
    enum : ['approved','pending', 'rejected'],
    default: ['pending']
  },
}, { toObject: { versionKey: false }});

// Schema for moon
const UserSchema: Schema = new Schema({
  email: String,
  password: String,
  groupChatsCreated: [Schema.Types.ObjectId],
  status: {
    type: String,
    enum: ['admin', 'banned', 'user'],
    default: 'user'
  }

}, { toObject: { versionKey: false }});

interface IUser extends Document {
  email: string;
  password: string;
  groupChatsCreated: [string];
  status: string;
}

const User: Model<IUser> = mongoose.model('Users', UserSchema);

const GroupChat = mongoose.model('GroupChats', GroupChatSchema);

export { mongoose, User, GroupChat, IUser}