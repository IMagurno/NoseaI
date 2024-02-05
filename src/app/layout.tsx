import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export const metadata = {
  title: "Kinde Auth",
  description: "Kinde with NextJS App Router",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="flex h-[60px] justify-between items-center border-b border-white px-[51px]">
            <h1 className="font-bold  text-2xl">NoseAI</h1>
            <div>
              {!(await isAuthenticated()) ? (
                <>
                  <div className="flex gap-5">
                    <LoginLink className="hover:underline">Sign in</LoginLink>
                    <RegisterLink className="hover:underline">
                      Sign up
                    </RegisterLink>
                  </div>
                </>
              ) : (
                <div className="flex">
                  {user?.picture ? (
                    <img
                      className="h-[45px] w-auto rounded-full mx-3"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="avatar">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="uppercase font-bold">
                      {user?.given_name} {user?.family_name}
                    </p>

                    <LogoutLink className="text-gray-400 hover:text-white">
                      Log out
                    </LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <strong className="text-heading-2">KindeAuth</strong>
            <p className="footer-tagline text-body-3">
              Visit our{" "}
              <Link className="link" href="https://kinde.com/docs">
                help center
              </Link>
            </p>

            <small className="font-bold text-red-500">
              © 2023 , Inc. All rights reserved
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
