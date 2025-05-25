import Post from "./post";
import User from "./user";

User.hasOne(Post, {foreignKey:"userId", as: "post"})
Post.belongsTo(User, {foreignKey:"userId", as: "user"})

export {User, Post}