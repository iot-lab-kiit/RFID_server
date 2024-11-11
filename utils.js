import { clientToken } from "./directus.js";
import {
  createItem,
  createItems,
  readItems,
  updateItem,
  updateItems,
} from "@directus/sdk";

export async function getMemberFromRFID(rfid) {
  try {
    return await clientToken().request(
      readItems("teams", {
        fields: ["id", "email", "rfid_tag"],
        filter: { rfid_tag: rfid },
      })
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getAttendanceDetails(memberId) {
  try {
    return await clientToken().request(
      readItems("attendance", {
        fields: ["id", "in_time", "out_time", "roll"],
        filter: {
          roll: memberId,
          in_time: { _lte: "$NOW" },
        },
        limit: 1,
        sort: "-in_time",
      })
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function CreateAttendance(memberId) {
  try {
    return await clientToken().request(
      createItem("attendance", [{ roll: memberId, in_time: new Date() }])
    );
  } catch (e) {
    console.error(e);
  }
}

export async function UpdateAttendance(attendanceId) {
  try {
    return await clientToken().request(
      updateItem("attendance", attendanceId, { out_time: new Date() })
    );
  } catch (e) {
    console.error(e);
  }
}
