export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
  course: Array<Maybe<Course>>;
  teacher: Array<Maybe<Teacher>>;
  student: Array<Maybe<Student>>;
};


export type QueryUserArgs = {
  UserName?: Maybe<Scalars['String']>;
  UserPassword?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  userName: Scalars['String'];
  userEmail: Scalars['String'];
  userPassword: Scalars['String'];
  userRole: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  _id: Scalars['ID'];
  courseId: Scalars['String'];
  courseName?: Maybe<Scalars['String']>;
  information?: Maybe<Scalars['String']>;
  students?: Maybe<Array<Maybe<Student>>>;
  teachers?: Maybe<Teacher>;
};


export type CourseStudentsArgs = {
  gender?: Maybe<Scalars['String']>;
};

export type Teacher = {
  __typename?: 'Teacher';
  _id: Scalars['ID'];
  courseId: Scalars['String'];
  name: Scalars['String'];
  course?: Maybe<Array<Maybe<Course>>>;
};

export type Student = {
  __typename?: 'Student';
  _id: Scalars['ID'];
  studentName: Scalars['String'];
  gender: Scalars['String'];
  phone: Scalars['String'];
  courses?: Maybe<Array<Maybe<Course>>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

