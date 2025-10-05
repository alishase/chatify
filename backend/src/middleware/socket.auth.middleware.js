import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1]
      ?.replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - no token provided"));
    }

    //verify the token

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    //find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    //attach user to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log("Socket connection accepted: ", user.fullName);

    next();
  } catch (error) {
    console.log("Error in socket auth middleware", error);
    return next(new Error("Not authorized"));
  }
};
