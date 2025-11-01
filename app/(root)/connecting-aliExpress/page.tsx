"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function ConnectingAliExpress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      if (!code) return;
      try {
        const res = await fetch(
          `https://api.darkak.com.bd/api/aliexpress/get-access-token/${code}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        console.log("response", res);

        if (!res.ok) throw new Error("Token exchange failed");
        const data = await res.json();

        console.log(data, "data");
        console.log("token", data.access_token);

        Cookies.set("aliExpressToken", data?.access_token, { expires: 25 });

        router.replace("/admin/ali-express-products/add-product");
      } catch (error) {
        console.error(error);
        toast.error("Failed to connect to AliExpress.");
      }
    };
    exchangeCodeForToken();
  }, [searchParams, code, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <p className="text-lg font-semibold">Connecting to AliExpress</p>
        <p className="text-sm text-gray-500">
          Please wait while we complete the authentication.
        </p>
      </div>
    </div>
  );
}
