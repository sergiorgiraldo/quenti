import { TRPCError } from "@trpc/server";

import type { NonNullableUserContext } from "../../lib/types";
import { collabTermsSelect, termsSelect } from "../study-sets/queries";
import type { TNewAttemptSchema } from "./new-attempt.schema";

type NewAttemptOptions = {
  ctx: NonNullableUserContext;
  input: TNewAttemptSchema;
};

export const newAttemptHandler = async ({ ctx, input }: NewAttemptOptions) => {
  const studySet = await ctx.prisma.studySet.findUnique({
    where: {
      id: input.studySetId,
      assignment: {
        type: "Collab",
        section: {
          students: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
      },
    },
    select: {
      assignment: {
        select: {
          id: true,
          class: {
            select: {
              members: {
                where: {
                  userId: ctx.session.user.id,
                },
                select: {
                  id: true,
                },
              },
            },
          },
          submissions: {
            where: {
              member: {
                userId: ctx.session.user.id,
              },
              submittedAt: {
                not: null,
              },
            },
            orderBy: {
              startedAt: "desc",
            },
            take: 1,
            select: {
              id: true,
              terms: {
                select: {
                  ...termsSelect,
                  ...collabTermsSelect,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!studySet || !studySet.assignment)
    throw new TRPCError({ code: "NOT_FOUND" });

  const memberId = studySet.assignment.class.members[0]?.id;
  if (!memberId) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

  const submission = studySet.assignment.submissions[0];
  if (!submission) throw new TRPCError({ code: "NOT_FOUND" });

  // TODO: handle submission dates
  await ctx.prisma.submission.create({
    data: {
      assignmentId: studySet.assignment.id,
      memberId,
      terms: {
        createMany: {
          data: submission.terms
            .sort((a, b) => a.rank - b.rank)
            .map((term, i) => ({
              ...term,
              rank: i,
              id: undefined,
              authorId: ctx.session.user.id,
              wordRichText: term.wordRichText ?? undefined,
              definitionRichText: term.definitionRichText ?? undefined,
              ephemeral: true,
            })),
        },
      },
    },
  });
};

export default newAttemptHandler;
