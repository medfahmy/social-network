// models

export interface User {
  name: string;
  email: string;
  password: string;
  date: Date;
}

export interface Profile {
  user: User;
  handle: string;
  bio: string;
  age: string;
  job: string;
}

export interface Post {
  user: User;
  text: string;
  name: string;
  likes: { user: User }[];
  comments: Comment[];
  date: Date;
}

export interface Comment {
  user: User;
  test: string;
  name: string;
  date: Date;
}

// errors

export interface UserErrors {
  user?: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface ProfileErrors {
  user?: string;
  profile?: string;
  handle?: string;
  bio?: string;
  age?: string;
  job?: string;
}

export interface PostErrors {
  user?: User;
  text?: string;
  name?: string;
  likes?: { user: User }[];
  comments?: Comment[];
  date?: Date;
}
