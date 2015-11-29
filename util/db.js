import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/unvis')

const db = mongoose.connection;
db.on('error', () => { console.error('connect failed') })

const UserSchema = new Schema({
  name: { type: String, unique: true },
  pass: { type: String, default: '******' },
  isAvailable: { type: Boolean, default: true }, 
  vote: {
    website: { type: Boolean, default: false },
    weichat: { type: Boolean, default: false },
    xinlingzhiyue: { type: Boolean, default: false }
  }
})
UserSchema.plugin(timestamp);

export const User = mongoose.model('User', UserSchema);
