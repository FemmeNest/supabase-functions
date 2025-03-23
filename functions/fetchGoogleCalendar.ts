export default async function fetchGoogleCalendar() {
  const GOOGLE_CALENDAR_ID = "femmenestwellness@gmail.com";
  const ACCESS_TOKEN = "ya29.a0AeXRPp4A5Ob4xxljc59gPey4Tb9r7FRKB15PiJrxeddijUxRFDVts9EYxRGJJ1m8_wyc_OWyqqacuWf-ouhrzSeifpgWI3Rjw1o_gbUgsnMVPFHSDPGkCaW3eDEt6sLadNZZnMUjDLvh3KqkbrfVa1Py7LgGzFKLyPaZraHSaCgYKATYSARMSFQHGX2MiAWNs6VPjrskhlf2aXnk3Ig0175";
  const SUPABASE_URL = "https://boxejeickqpjbukfdsub.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveGVqZWlja3FwamJ1a2Zkc3ViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTEzMTMzNSwiZXhwIjoyMDU0NzA3MzM1fQ.4Byb0qY4lxNJSQYrdbKHh3imIFuvJdRthRW-1StVLd4";

  // Fetch Google Calendar events
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  
  if (!data.items) {
    console.error("Error fetching calendar events:", data);
    return;
  }

  // Process events and send to Supabase
  const events = data.items.map((event) => ({
    date: event.start.date || event.start.dateTime.split("T")[0],
    start_time: event.start.dateTime ? event.start.dateTime.split("T")[1] : null,
    end_time: event.end.dateTime ? event.end.dateTime.split("T")[1] : null,
  }));

  await fetch(`${SUPABASE_URL}/rest/v1/available_dates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify(events),
  });

  console.log("Events saved to Supabase:", events);
}
