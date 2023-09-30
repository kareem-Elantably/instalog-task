"use client";
import EventsTable from "../components/eventsTable";
import LoginComponent from "../components/addEvent";

function MainPage() {
  return (
    <div>
      <LoginComponent />
      {/* Other components */}
      <EventsTable />
      {/* Other components */}
    </div>
  );
}

export default MainPage;
