import { z } from "zod";
import { MAX_TERM } from "../../common/constants";
import { profanity } from "../../common/profanity";

export const ZBulkEditSchema = z
  .object({
    studySetId: z.string(),
    terms: z.array(
      z.object({
        id: z.string(),
        word: z.string(),
        definition: z.string(),
      })
    ),
  })
  .transform((z) => ({
    ...z,
    terms: z.terms.map((term) => ({
      ...term,
      word: profanity.censor(term.word.slice(0, MAX_TERM)),
      definition: profanity.censor(term.definition.slice(0, MAX_TERM)),
    })),
  }));

export type TBulkEditSchema = z.infer<typeof ZBulkEditSchema>;