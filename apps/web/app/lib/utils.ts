import { hash } from "bcryptjs";
// Function to hash a password
export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return await hash(password, saltRounds)
}
