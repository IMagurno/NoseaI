import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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
          <nav className="flex fixed top-0 w-full z-10 bg-transparent h-16 justify-between items-center px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <a href="/" className="font-bold text-xl md:text-2xl">
              NoseAI
            </a>
            <div className="flex items-center justify-between">
              <div className="hidden md:flex gap-3 px-4">
                {/* <a href="#" className="font-semibold hover:underline">
                  Gallery
                </a>
                <a href="#" className="font-semibold hover:underline">
                  Pricing
                </a> */}
              </div>
              {!(await isAuthenticated()) ? (
                <div className="flex gap-3 items-center">
                  <LoginLink className="text-sm md:text-base relative inline-flex items-center justify-center px-2 py-1 overflow-hidden rounded-lg text-white border border-white hover:bg-gray-200 hover:text-black transition-colors">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="text-sm md:text-base relative inline-flex items-center justify-center px-2 py-1 overflow-hidden rounded-lg text-white border border-white hover:bg-gray-200 hover:text-black transition-colors">
                    Sign up
                  </RegisterLink>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {user?.picture ? (
                    <img
                      className="h-10 w-auto rounded-full"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="avatar text-sm">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="uppercase font-semibold text-xs md:text-sm">
                      {user?.given_name} {user?.family_name}
                    </p>

                    <LogoutLink className="text-gray-400 hover:text-white text-xs md:text-sm">
                      Log out
                    </LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <div className="container mx-auto px-4 text-center">
            <small className="font-bold text-red-500">
              © 2023 , Inc. All rights reserved
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
