import {
  createDirectus,
  rest,
  authentication,
  staticToken,
} from "@directus/sdk";
import dotenv from "dotenv";
dotenv.config();

export const clientToken = (token) => {
  return createDirectus(process.env.PUBLIC_DIRECTUS_URL)
    .with(staticToken(token))
    .with(rest());
};

import { readItems, updateItems } from "@directus/sdk";

export async function checkRFIDTag(rfidTag, token) {
  try {
    const client = clientToken(token);
    
    
    const response = await client.request(
      readItems("teams", {
        fields: ["id", "email", "rfid_tag", "attendance"],
      })
    );
    // console.log("Fetched data:", response);
    
   const target=rfidTag;
    const team = response.find((item) => item.rfid_tag == target);

    if (team) {
      console.log("RFID Tag exists:", team);
      await updateAttendance(team.id, token);
    } else {
      console.log("RFID Tag does not exist.");
    }
    
    return team;
  } catch (error) {
    console.error("Error fetching RFID tag:", error);
  }
}

async function updateAttendance(teamId, token) {
  try {
    const client = clientToken(token);

    const updatedTeam = await client.request(
      updateItems("teams", { filter: { id: teamId } }, { attendance: true })
    );
    
    console.log("Attendance updated:", updatedTeam);
  } catch (error) {
    console.error("Error updating attendance:", error);
  }
}



// Example RFID tag and token
const rfidTag = 2431004846.0; // replace with the actual RFID tag
const token = process.env.TOKEN; // replace with the actual token

// Call the function and handle the result
checkRFIDTag(rfidTag, token)
  .then((team) => {
    if (team) {
      console.log("RFID tag data:", team);
    } else {
      console.log("RFID tag not found in the database.");
    }
  })
  .catch((error) => {
    console.error("Error in RFID tag check:", error);
  });
