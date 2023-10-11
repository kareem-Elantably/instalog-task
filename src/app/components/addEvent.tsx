import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

interface UserDataType {
  name: string;
  email: string;
}
interface ActionDataType {
  actionId: string;
  name: string;
}
interface EventObjectType {
  eventId: string;
  actorId: number;
  group: string;
  actionId: number;
  targetId: number;
  location: string;
  metadata: string;
}

const userData = {
  name: uuidv4(),
  email: uuidv4(),
};

const actionData = {
  actionId: uuidv4(),
  name: uuidv4(),
};

const eventObject = {
  eventId: uuidv4(),
  actorId: 1,
  group: "instatus.com",
  actionId: 1,
  targetId: 1,
  location: "105.40.62.95",
  occurredAt: new Date().toISOString(),
  metadata: "{'key':'value'}",
};

async function postToAPI(model: string, data: any) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to post to /api/events: ${await response.text()}`);
  }

  return await response.json();
}

async function addUser(userData: UserDataType) {
  return await postToAPI("user", userData);
}

async function addAction(actionData: ActionDataType) {
  return await postToAPI("action", actionData);
}

async function addEvent(eventObject: EventObjectType) {
  return await postToAPI("event", eventObject);
}

async function handleEvent(userData: EventObjectType) {
  try {
    await addEvent(eventObject);
  } catch (error) {
    console.error("Error logging event:", error);
  }
}
async function handleAction(Data: ActionDataType) {
  try {
    await addAction(Data);
  } catch (error) {
    console.error("Error logging event:", error);
  }
}
async function handleUser(Data: UserDataType) {
  try {
    await addUser(Data);
  } catch (error) {
    console.error("Error logging event:", error);
  }
}

function buttonPostComponent() {
  const onEventButtonClick = async () => {
    await handleEvent(eventObject);
  };
  const onActionButtonClick = async () => {
    await handleAction(actionData);
  };
  const onUserButtonClick = async () => {
    await handleUser(userData);
  };

  return (
    <div className="m-2">
      <Button
        className="rounded-xl m-4"
        variant="outline"
        onClick={onEventButtonClick}
      >
        Event
      </Button>
      <Button
        className="rounded-xl m-4"
        variant="outline"
        onClick={onUserButtonClick}
      >
        User
      </Button>
      <Button
        className="rounded-xl m-4"
        variant="outline"
        onClick={onActionButtonClick}
      >
        Action
      </Button>
    </div>
  );
}

export default buttonPostComponent;
