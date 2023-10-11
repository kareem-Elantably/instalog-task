import React, { useState, useEffect } from "react";
import useSWR from "swr";
import format from "date-fns/format";

interface Event {
  id: number;
  eventId: string;
  actor: { name: string; email: string; id: string };
  group: string;
  action: { name: string; id: string };
  target: { name: string; id: string } | null;
  location: string;
  occurredAt: string;
}

function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

function EventsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);

  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  const { data, error } = useSWR(`/api/events?page=${page}&limit=2`, fetcher);

  useEffect(() => {
    if (data && data.length) {
      setEvents((prevEvents) => [...prevEvents, ...data]);
    }
  }, [data]);

  const filteredEvents =
    events.filter(
      (event: Event) =>
        event.actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.actor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.action.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (error) return <div>error </div>;
  if (!events.length && !data) return <div>Loading...</div>;

  return (
    <div className=" flex justify-center ">
      <div className=" pt-4 bg-gray-100 w-2/3  rounded-xl mt-6">
        <div className=" px-4">
          <input
            type="text"
            placeholder="Search name,email or action..."
            className="mb-4 p-2 w-full border rounded-xl bg-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="min-w-full px-4">
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
            </tr>
          </thead>

          <tbody className="bg-white">
            {filteredEvents.map((event: Event) => (
              <React.Fragment key={event.id}>
                <tr
                  onClick={() =>
                    setExpandedEventId(
                      event.id === expandedEventId ? null : event.id
                    )
                  }
                >
                  <td className="py-2 px-4 text-xs">{event.actor.name}</td>
                  <td className="py-2 px-4 text-xs">{event.action.name}</td>
                  <td className="py-2 px-4 text-xs">
                    {format(new Date(event.occurredAt), "MMM d, h:mm aa")}
                  </td>
                  <td className="py-2 px-4 "></td>
                </tr>

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

                                <div className="mb-2">Email</div>

                                <div className="mb-2">ID</div>
                              </td>
                              <td className="	text-xs	">
                                <div className="mb-2">{event.actor.name}</div>

                                <div className="mb-2">{event.actor.email}</div>

                                <div className="mb-2">{event.actor.id}</div>
                              </td>
                              <td className="text-gray-400	text-xs	">
                                <div className="mb-2">Name </div>
                                <div className="mb-2">Object</div>

                                <div className="mb-2">ID </div>
                              </td>
                              <td className="	text-xs	">
                                <div className="mb-2">{event.action.name}</div>

                                <div className="mb-2"> Event_action</div>

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
