const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const bcrypt = require('bcrypt');
const user = require('../../models/user');


const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

const User = require('../../models/user');



const rootValue = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => ({ ...event._doc, _id: event.id }));
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
    });
    try {
      const result = await event.save();
      return { ...result._doc, _id: result.id.toString() };
    } catch (err) {
      throw err;
    }
  },

  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User already exists.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async args => {
    const event = await Event.findOne({ _id: args.eventID });
    const booking = new Booking({
      user: args.userId,
      event: event,
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
    };
  },

  cancelBooking: async args => {
    const currentBooking = await Booking.findById(args.bookingId).populate('event');
    const event = {
      ...currentBooking.event._doc,
      _id: currentBooking.event.id,
    };
    await Booking.deleteOne({ _id: args.bookingId });
    return event;
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('The requested user could not be found.');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Incorrect password try again.');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION_TIME
      }
    );
    return { userId: user.id, token: token, tokenExpiration: JWT_EXPIRATION_TIME / 3600};
  }
  

};

module.exports = rootValue;