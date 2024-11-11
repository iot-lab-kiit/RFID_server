import {
  CreateAttendance,
  getAttendanceDetails,
  getMemberFromRFID,
  UpdateAttendance,
} from "./utils.js";

export async function checkRFIDTag(rfid) {
  try {
    const response = await getMemberFromRFID(rfid);

    if (response.length === 0) return null;
    else await attendanceLogic(response[0]);
  } catch (error) {
    console.error("Error fetching RFID tag:", error);
  }
}

async function attendanceLogic(memberObj) {
  try {
    const response = await getAttendanceDetails(memberObj.id);

    if (
      response.length === 0 ||
      new Date(response[0].in_time).getDate() !== new Date().getDate()
    ) {
      CreateAttendance(memberObj.id);
    } else if (
      new Date(response[0].in_time).getDate() === new Date().getDate() &&
      !response[0].out_time
    ) {
      UpdateAttendance(response[0].id);
    }
  } catch (error) {
    console.error("Error updating attendance:", error);
  }
}
