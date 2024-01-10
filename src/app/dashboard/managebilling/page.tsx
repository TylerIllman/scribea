import BillingForm from "~/components/BillingForm";
import { getUserSubscriptionPlan } from "~/lib/stripe";

const Page = async () => {
  const subscriptionPan = await getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscriptionPan} />;
};

export default Page;
