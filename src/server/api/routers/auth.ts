import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { PLANS } from "~/config/stripe";
import { getUserSubscriptionPlan, stripe } from "~/lib/stripe";
import { absoluteUrl } from "~/lib/utils";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const authRouter = createTRPCRouter({
  authCallback: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.id || !ctx.user.emailAddresses[0]?.emailAddress) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await ctx.db.user.findFirst({
      where: {
        id: ctx.user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          id: ctx.user.id,
          email: ctx.user.emailAddresses[0]?.emailAddress,
        },
      });
    }

    return { success: true };
  }),

  createStripeSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    // const billingUrl = absoluteUrl("/dashboard/managebilling")
    const billingUrl = "https://scribea.tyleri.dev/dashboard/managebilling";

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

    const subscriptionPlan = await getUserSubscriptionPlan();

    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: billingUrl,
      });

      return { url: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    });

    return { url: stripeSession.url };
  }),
});
