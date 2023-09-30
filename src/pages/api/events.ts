import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {

      const { model, data } = req.body;

  switch (model) {
    case "user":
      const newUser = await prisma.user.create({
        data: data,
      });
      res.json(newUser);
      break;
    case "action":
      
      const newAction = await prisma.eventAction.create({
        data: data,
      });
      res.json(newAction);
      break;
    case "event":
      const newEvent = await prisma.event.create({
        data: data,
      });
      res.json(newEvent);
      break;
    default:
      res.status(400).json({ error: "Invalid model specified" });
      break;
    }
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
        orderBy: {
          occurredAt: 'desc', 
        },
        include: {
          actor: {
            select: { name: true,email: true,id: true }  
          },
          action: {
            select: { name: true,id: true }  
          },
          target: {                  
            select: { name: true,id: true } 
          }
        }
      });
      
      
      res.json(events);
      
      
      res.json(events);
    } else {
      res.status(405).end(); 
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" , details: error});
  }
};
