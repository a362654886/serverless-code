type User = {
  userEmail: string;
  userPassword: string;
  userName: string;
  userRole: string;
}

enum Role {
  STUDENT = "Student",
  TEACHER = "Teacher",
  ADMIN = "Admin"
}

export const isUser = <T>(props: any): props is User =>
  typeof (props as User)['userEmail'] !== 'undefined'

export { User, Role };
