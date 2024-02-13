import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export const metadata = {
  title: "NoseqAI",
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
          <nav className="flex fixed top-0 w-full z-10 bg-transparent h-[60px] justify-between items-center m-3 px-[50px]">
            <a href="/" className="font-bold  text-2xl">
              NoseAI
            </a>
            <div className="flex flex-row items-center justify-between-between">
              <div className="flex gap-3 px-4">
                <a href="#" className="font-semibold hover:underline">
                  Gallery
                </a>
                <a href="#" className="font-semibold hover:underline ">
                  Pricing
                </a>
              </div>
              {!(await isAuthenticated()) ? (
                <>
                  <div className="flex gap-5 items-center">
                    <LoginLink className="relative inline-flex items-center justify-center p-1 overflow-hidden text-white rounded-lg group bg-gradient-to-br from-transparent border border-white hover:bg-gray-200 hover:text-black transition-colors">
                      Sign in
                    </LoginLink>
                    <RegisterLink className="relative inline-flex items-center justify-center p-1  overflow-hidden text-white rounded-lg group bg-gradient-to-br from-transparent border border-white hover:bg-gray-200 hover:text-black transition-colors">
                      Sign up
                    </RegisterLink>
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  {user?.picture ? (
                    <img
                      className="h-[40px] w-auto rounded-full mx-3"
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
                    <p className="uppercase font-semibold text-sm">
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
        <footer className="bg">
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
