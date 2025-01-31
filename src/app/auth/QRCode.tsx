"use client";

import { useQRCode } from "next-qrcode";

export const QRCode = ({
  secret,
  login,
}: {
  secret: string;
  login: string;
}) => {
  const { Canvas } = useQRCode();

  const uri = new URL("otpauth://totp");

  uri.pathname = `gmnotes:${login}`;

  uri.searchParams.append("secret", secret);
  uri.searchParams.append("issuer", "gmnotes");
  uri.searchParams.append("algorithm", "SHA1");
  uri.searchParams.append("digits", "6");
  uri.searchParams.append("period", "30");

  return (
    <>
      {uri.toString()}
      <Canvas
        text={uri.toString()}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#111111FF",
            light: "#EEEEEEFF",
          },
        }}
      />
    </>
  );
};
