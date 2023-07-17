import { loadHandler } from "../../../lib/load-handler";
import { createTRPCRouter, teacherProcedure } from "../../trpc";
import { ZAcceptInviteSchema } from "./accept-invite.schema";
import { ZAcceptTokenSchema } from "./accept-token.schema";
import { ZCreateInviteSchema } from "./create-invite.schema";
import { ZCreateSchema } from "./create.schema";
import { ZDeleteSchema } from "./delete.schema";
import { ZEditMemberRoleSchema } from "./edit-member-role.schema";
import { ZGetStudentsSchema } from "./get-students.schema";
import { ZGetSchema } from "./get.schema";
import { ZPublishSchema } from "./publish.schema";
import { ZRemoveMemberSchema } from "./remove-member.schema";
import { ZSetInviteExpirationSchema } from "./set-invite-expiration.schema";
import { ZUpdateSchema } from "./update.schema";

type OrganizationsRouterHandlerCache = {
  handlers: {
    ["get-belonging"]?: typeof import("./get-belonging.handler").getBelongingHandler;
    get?: typeof import("./get.handler").getHandler;
    ["get-students"]?: typeof import("./get-students.handler").getStudentsHandler;
    create?: typeof import("./create.handler").createHandler;
    update?: typeof import("./update.handler").updateHandler;
    publish?: typeof import("./publish.handler").publishHandler;
    delete?: typeof import("./delete.handler").deleteHandler;
    ["create-invite"]?: typeof import("./create-invite.handler").createInviteHandler;
    ["set-invite-expiration"]?: typeof import("./set-invite-expiration.handler").setInviteExpirationHandler;
    ["accept-token"]?: typeof import("./accept-token.handler").acceptTokenHandler;
    ["accept-invite"]?: typeof import("./accept-invite.handler").acceptInviteHandler;
    ["edit-member-role"]?: typeof import("./edit-member-role.handler").editMemberRoleHandler;
    ["remove-member"]?: typeof import("./remove-member.handler").removeMemberHandler;
  };
} & { routerPath: string };

const HANDLER_CACHE: OrganizationsRouterHandlerCache = {
  handlers: {},
  routerPath: "organizations",
};

export const organizationsRouter = createTRPCRouter({
  getBelonging: teacherProcedure.query(async ({ ctx }) => {
    await loadHandler(HANDLER_CACHE, "get-belonging");
    return HANDLER_CACHE.handlers["get-belonging"]!({ ctx });
  }),
  get: teacherProcedure.input(ZGetSchema).query(async ({ ctx, input }) => {
    await loadHandler(HANDLER_CACHE, "get");
    return HANDLER_CACHE.handlers["get"]!({ ctx, input });
  }),
  getStudents: teacherProcedure
    .input(ZGetStudentsSchema)
    .query(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "get-students");
      return HANDLER_CACHE.handlers["get-students"]!({ ctx, input });
    }),
  create: teacherProcedure
    .input(ZCreateSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "create");
      return HANDLER_CACHE.handlers["create"]!({ ctx, input });
    }),
  update: teacherProcedure
    .input(ZUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "update");
      return HANDLER_CACHE.handlers["update"]!({ ctx, input });
    }),
  publish: teacherProcedure
    .input(ZPublishSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "publish");
      return HANDLER_CACHE.handlers["publish"]!({ ctx, input });
    }),
  delete: teacherProcedure
    .input(ZDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "delete");
      return HANDLER_CACHE.handlers["delete"]!({ ctx, input });
    }),
  createInvite: teacherProcedure
    .input(ZCreateInviteSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "create-invite");
      return HANDLER_CACHE.handlers["create-invite"]!({ ctx, input });
    }),
  setInviteExpiration: teacherProcedure
    .input(ZSetInviteExpirationSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "set-invite-expiration");
      return HANDLER_CACHE.handlers["set-invite-expiration"]!({ ctx, input });
    }),
  acceptToken: teacherProcedure
    .input(ZAcceptTokenSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "accept-token");
      return HANDLER_CACHE.handlers["accept-token"]!({ ctx, input });
    }),
  acceptInvite: teacherProcedure
    .input(ZAcceptInviteSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "accept-invite");
      return HANDLER_CACHE.handlers["accept-invite"]!({ ctx, input });
    }),
  editMemberRole: teacherProcedure
    .input(ZEditMemberRoleSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "edit-member-role");
      return HANDLER_CACHE.handlers["edit-member-role"]!({ ctx, input });
    }),
  removeMember: teacherProcedure
    .input(ZRemoveMemberSchema)
    .mutation(async ({ ctx, input }) => {
      await loadHandler(HANDLER_CACHE, "remove-member");
      return HANDLER_CACHE.handlers["remove-member"]!({ ctx, input });
    }),
});