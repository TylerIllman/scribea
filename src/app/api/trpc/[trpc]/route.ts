import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from "@/trpc"
import { createContext } from '@/trpc/trpc';
import { createNextApiHandler } from '@trpc/server/adapters/next';

const handler = async (req: Request) => {
  context = await createContext();

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };

