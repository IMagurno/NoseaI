import {
  authMiddleware,
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req: Request) {
  return withAuth(req);
}

export const config = {
  matcher: [], // VOLVER A ANADIR EL /rooms DESPUES DE SOLUCIONAR EL DEPLOY EN VERCEL
};
