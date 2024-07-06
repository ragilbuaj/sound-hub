import bcrypt from "bcrypt";

async function hashed(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

async function check(password: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export default { hashed, check };
