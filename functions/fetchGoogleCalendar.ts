const { google } = require("googleapis");

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  "385511835146-gqqg3kfh4ohtk0tl3qrvcr516jfvoear.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);

// Set the refresh token (replace with your actual stored refresh token)
oauth2Client.setCredentials({
  refresh_token: "1//04A8cKlJ4mNy8CgYIARAAGAQSNwF-L9IrtMZ7w836mbHtOvGkPInNbH2439v5G531CrlobXXf1kWEk_GJ6ShVwZPYry2CsHsoctM",
});

// Function to get a fresh access token
async function getAccessToken() {
  try {
    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

export default async function fetchGoogleCalendar() {
  const GOOGLE_CALENDAR_ID = "femmenestwellness@gmail.com";
  const SUPABASE_URL = "https://boxejeickqpjbukfdsub.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveGVqZWlja3FwamJ1a2Zkc3ViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTEzMTMzNSwiZXhwIjoyMDU0NzA3MzM1fQ.4Byb0qY4lxNJSQYrdbKHh3imIFuvJdRthRW-1StVLd4";

 async function fetchCalendarEvents() {
  const accessToken = await getAccessToken(); // Get fresh token
  if (!accessToken) {
    console.error("Failed to retrieve access token.");
    return;
  }

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Fetched events:", response.data.items);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
  }
}
const accessToken = await getAccessToken();
console.log("Access Token:", accessToken); // Debugging line
if (!accessToken) {
    console.error("Failed to retrieve access token.");
    return;
}

  const data = await response.json();
  
  if (!data.items) {
    console.error("Error fetching calendar events:", data);
    return;
  }

  const response = await fetch(SUPABASE_URL + "/rest/v1/available_dates", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "apiKey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
    },
    body: JSON.stringify(events)
});

const data = await response.json(); 
console.log("Supabase Response:", data); // Debugging line

