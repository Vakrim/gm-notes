"use client";

import { useState } from "react";
import { textInput } from "../../lib/ui/tailwindClasses";
import { signIn } from "../../lib/auth/signIn";
import { verifyLogin } from "@/lib/auth/verifyLogin";
import { QRCode } from "./QRCode";
import { assertNever } from "../../lib/assertNever";

export const AuthForm = () => {
  const [formStep, setFormStep] = useState<
    | { step: "verifyLogin" }
    | { step: "signInVerifyOTP" }
    | { step: "signUpVerifyOTP"; secret: string }
  >({ step: "verifyLogin" });
  const [login, setLogin] = useState("");
  const [otp, setOTP] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formStep.step === "verifyLogin") {
      const loginState = await verifyLogin({ login });

      if (loginState.loginExists) {
        setFormStep({ step: "signInVerifyOTP" });
      } else {
        setFormStep({ step: "signUpVerifyOTP", secret: loginState.secret });
      }
      return;
    }

    if (
      formStep.step === "signInVerifyOTP" ||
      formStep.step === "signUpVerifyOTP"
    ) {
      const response = await signIn({ login, otp });

      if (response.error) {
        alert(response.error);
      }

      return;
    }

    assertNever(formStep);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <label className="text-lg font-semibold">Login:</label>
        <input
          name="login"
          type="text"
          className={textInput}
          value={login}
          onChange={(e) => {
            if (formStep.step !== "verifyLogin") {
              setFormStep({ step: "verifyLogin" });
            }
            setLogin(e.target.value);
            setOTP("");
          }}
        />

        {formStep.step === "signUpVerifyOTP" && (
          <>
            <label>Scan QR code with Authenticator app</label>
            <QRCode secret={formStep.secret} login={login} />
          </>
        )}

        {(formStep.step === "signInVerifyOTP" ||
          formStep.step === "signUpVerifyOTP") && (
          <>
            <label className="text-lg font-semibold">One time password:</label>
            <input
              name="otp"
              type="text"
              className={textInput}
              value={otp}
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
          </>
        )}

        <input
          type="submit"
          value="Sign up"
          className="bg-primary rounded px-2 py-1 cursor-pointer hover:bg-primary-dark"
        />
      </form>
    </>
  );
};
