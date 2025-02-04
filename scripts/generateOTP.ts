import { TOTP } from "totp-generator";
import { db } from "../src/lib/db";

const login = process.argv[2];

if (!login) {
  console.error("Usage: generateOTP <login>");
  process.exit(1);
}

const user = await db.user.findUnique({
  where: {
    login,
  },
});

if (!user) {
  console.error("User not found");
  process.exit(1);
}

const code = TOTP.generate(user.OTPSecret);

console.log(
  `Code ${code.otp} expires in ${Math.floor(
    (code.expires - new Date().valueOf()) / 1000,
  )} seconds`,
);
