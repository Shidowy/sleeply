export default interface User {
    id?: any | null,
    username: string,
    email: string,
    password: string,
    roles?: Array<string>
  }