import { TRPCError } from "@trpc/server";
import { isOrganizationOwner } from "../../../lib/queries/organizations";
import type { NonNullableUserContext } from "../../../lib/types";
import type { TDeleteSchema } from "./delete.schema";
import { cancelOrganizationSubscription } from "../../../../payments/subscription";

type DeleteOptions = {
  ctx: NonNullableUserContext;
  input: TDeleteSchema;
};

export const deleteHandler = async ({ ctx, input }: DeleteOptions) => {
  if (!(await isOrganizationOwner(ctx.session.user.id, input.orgId)))
    throw new TRPCError({ code: "UNAUTHORIZED" });

  await cancelOrganizationSubscription(input.orgId);

  await ctx.prisma.organization.delete({
    where: {
      id: input.orgId,
    },
  });
};

export default deleteHandler;