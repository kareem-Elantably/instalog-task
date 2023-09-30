import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {

      const event = await prisma.event.create({
        data: req.body,
      });
      res.json(event);
    } else if (req.method === "GET") {
      const {
        page = 1,
        limit = 5,
        search,
        actor_id,
        target_id,
        action_id,
        name,
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const filterOptions = {
        actorId: actor_id ? Number(actor_id) : undefined,
        targetId: target_id ? Number(target_id) : undefined,
        actionId: action_id ? Number(action_id) : undefined,
        name: name ? name.toString() : undefined,
      };

      const events = await prisma.event.findMany({
        where: filterOptions,
        skip,
        take: Number(limit),
        include: {
          actor: {
            select: { name: true,email: true,id: true }  // Selecting only the name of the actor.
          },
          action: {
            select: { name: true,id: true }  // Selecting only the name of the action.
          },
          target: {                  // <-- This is what you would add
            select: { name: true,id: true }  // Selecting only the name of the target.
          }
        }
      });
      
      
      res.json(events);
      
      
      res.json(events);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" , details: error});
  }
};
