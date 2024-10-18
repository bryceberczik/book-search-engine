import { User, Book } from "../models/index.js";
import { signToken, AuthenticationError } from "../services/auth.js";

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}
interface UserArgs {
  username: string;
}

interface BookArgs {
  bookId: string;
}

interface AddBookArgs {
  input: {
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image?: string;
    link?: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("savedBooks");
    },
    user: async (_parent: unknown, { username }: UserArgs) => {
      return User.findOne({ username }).populate("savedBooks");
    },
    books: async () => {
      return Book.find();
    },
    book: async (_parent: unknown, { bookId }: BookArgs) => {
      return Book.findOne({ bookId });
    },
    me: async (
      _parent: unknown,
      _args: unknown,
      context: { user?: { _id: string } }
    ) => {
      if (context.user) {
        return User.findById(context.user._id).populate("savedBooks");
      }
      throw new AuthenticationError("Not authenticated");
    },
  },
  Mutations: {
    addUser: async (_parent: unknown, { input }: AddUserArgs) => {
      const user = await User.create(input);
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Could not authenticate user.");
      }

      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
    addBook: async (_parent: unknown, { input }: AddBookArgs) => {
      const book = await Book.create(input);
      return book;
    },
    removeBook: async (_parent: unknown, { bookId }: BookArgs) => {
      const book = await Book.findOneAndDelete({ bookId });
      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    },
  },
};

export default resolvers;
