import React from "react";
interface UserDataType {
  id: number;
  name: string;
  email: string;
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

async function addEvent(eventObject: EventObjectType) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventObject),
  });

  if (!response.ok) {
    throw new Error(`Failed to log event: ${await response.text()}`);
  }

  return await response.json();
}

async function handleAction(userData: UserDataType, action: number) {
  const eventObject = {
    eventId: "6", // Change from event_id to eventId
    actorId: userData.id, // Change from actor_id to actorId
    group: "instatus.com",
    actionId: 2, // Change from action_id to actionId
    targetId: userData.id, // Change from target_id to targetId
    location: "105.40.62.95",
    occurredAt: new Date().toISOString(), // Change from occurred_at to occurredAt
    metadata: "{'key':'value'}",
  };

  try {
    await addEvent(eventObject);
  } catch (error) {
    console.error("Error logging event:", error);
  }
}

function LoginComponent() {
  const userData = {
    id: 2,
    name: "test2",
    email: "test2@gmail.com",
  };

  const onLoginButtonClick = async () => {
    await handleAction(userData, 2);
  };

  return (
    <div>
      <button onClick={onLoginButtonClick}>Simulate Login Success</button>
    </div>
  );
}

export default LoginComponent;
