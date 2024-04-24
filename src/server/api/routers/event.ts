import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const createEvent = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    startTime: z.date(),
    endTime: z.date(),
    participants: z.string().min(3)
})

const updateEvent = z.object({
  id: z.number(),
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  participants: z.string().min(3).optional(),
});

export const eventRouter = createTRPCRouter({

  getAll: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.event.findMany({ where: { createdById: ctx.session.user.id } });
    }),

  create: protectedProcedure
  .input(createEvent)
  .mutation(async ({ ctx, input }) => {
    const existingEvent = await ctx.db.event.findFirst({
      where: {
        createdById: ctx.session.user.id,
        AND: [
          {
            startTime: {
              gte: input.startTime,
              lt: input.endTime,
            },
          },
          {
            endTime: {
              gt: input.startTime,
              lte: input.endTime,
            },
          },
        ],
      },
    });

    if (existingEvent) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Event conflicts with an existing event.",
      });
    }

    return ctx.db.event.create({
      data: {
        ...input,
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  }),

  update: protectedProcedure
  .input(updateEvent)
  .mutation(({ ctx, input }) => {
    return ctx.db.event.update({
      where: { id: input.id },
      data: {
        ...input, // Include all input data
        updatedAt: new Date(), // Set updatedAt to current timestamp
      },
    });
  }),
      
  delete: protectedProcedure
  .input(z.number())
  .mutation(({ ctx, input }) => {
    return ctx.db.event.delete({ where: { id: input } });
  }),
});
