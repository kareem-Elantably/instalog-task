import React, { useState, useEffect } from "react";
import useSWR from "swr";
import format from "date-fns/format";

interface Event {
  id: number;
  eventId: string;
  actor: { name: string; email: string; id: string }; // <-- Modify this
  group: string;
  action: { name: string; id: string }; // <-- Modify this
  target: { name: string; id: string } | null; // Add this if you're including target names
  location: string;
  occurredAt: string;
  // ... other properties of the event
}

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

function EventsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]); // <-- New state to store all fetched events

  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  const { data, error } = useSWR(`/api/events?page=${page}&limit=2`, fetcher);

  useEffect(() => {
    if (data && data.length) {
      setEvents((prevEvents) => [...prevEvents, ...data]); // <-- Append new events to existing events
    }
  }, [data]);

  const filteredEvents =
    events.filter(
      (event: Event) =>
        event.actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.actor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.action.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (error) return <div>error</div>;
  if (!events.length && !data) return <div>Loading...</div>;

  return (
    <div className=" flex justify-center ">
      <div className=" pt-4 bg-gray-100 w-2/3  rounded-xl mt-6">
        {/* Search bar */}
        <div className=" px-4">
          <input
            type="text"
            placeholder="Search name,email o action..."
            className="mb-4 p-4 w-full border rounded-xl bg-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Events Table */}
        <table className="min-w-full px-4">
          {/* Table headers */}
          <thead>
            <tr className="py-2 px-4  bg-gray-100">
              <th className="py-2 px-4  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actor
              </th>
              <th className="py-2 px-4  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="py-2 px-4  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-2 px-4  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
              {/* Add other headers similarly */}
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="bg-white">
            {filteredEvents.map((event: Event) => (
              <React.Fragment key={event.id}>
                {/* Main Event Row */}
                <tr
                  onClick={() =>
                    setExpandedEventId(
                      event.id === expandedEventId ? null : event.id
                    )
                  }
                >
                  <td className="py-2 px-4">{event.actor.name}</td>
                  <td className="py-2 px-4 ">{event.action.name}</td>
                  <td className="py-2 px-4">
                    {format(new Date(event.occurredAt), "MMM d, h:mm aa")}
                  </td>
                  <td className="py-2 px-4 "></td>
                </tr>
                {/* Expanded Event Details Row */}
                {expandedEventId === event.id && (
                  <tr className="bg-transparent">
                    <td colSpan={4} className="p-0 bg-transparent">
                      <div
                        className={`transition-max-h duration-500 overflow-hidden ${
                          expandedEventId === event.id ? "max-h-48" : "max-h-0"
                        } -mx-3 px-6 py-4 border rounded-xl bg-white`}
                      >
                        <table className="w-full">
                          <thead>
                            <tr className="text-gray-500">
                              <th className="text-left">Actor</th>
                              <th className="text-left"></th>
                              <th className="text-left">Action</th>
                              <th className="text-left"></th>
                              <th className="text-left">Date</th>
                              <th className="text-left"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-gray-400	text-xs	">
                                <div className="mb-2">Name</div>
                                {/* Assuming you have an email property in actor */}
                                <div className="mb-2">Email</div>
                                {/* Assuming you have an ID property in actor */}
                                <div className="mb-2">ID</div>
                              </td>
                              <td className="	text-xs	">
                                <div className="mb-2">{event.actor.name}</div>
                                {/* Assuming you have an email property in actor */}
                                <div className="mb-2">{event.actor.email}</div>
                                {/* Assuming you have an ID property in actor */}
                                <div className="mb-2">{event.actor.id}</div>
                              </td>
                              <td className="text-gray-400	text-xs	">
                                <div className="mb-2">Name </div>
                                <div className="mb-2">Object</div>
                                {/* Assuming you have an ID property in action */}
                                <div className="mb-2">ID </div>
                              </td>
                              <td className="	text-xs	">
                                <div className="mb-2">{event.action.name}</div>
                                {/* Assuming you have an email property in actor */}
                                <div className="mb-2"> Event_action</div>
                                {/* Assuming you have an ID property in actor */}
                                <div className="mb-2">{event.action.id}</div>
                              </td>
                              <td className="text-gray-400	text-xs	">
                                <div className="mb-2">Readable</div>
                              </td>
                              <td className="	text-xs	">
                                <div className="mb-2">
                                  {format(
                                    new Date(event.occurredAt),
                                    "MMM d, h:mm aa"
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className=" flex justify-center w-full  mt-2 p-2">
          <button onClick={() => setPage(page + 1)}>Load More</button>
        </div>
      </div>
    </div>
  );
}

export default EventsTable;
