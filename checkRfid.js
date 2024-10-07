import { readItems } from '@directus/sdk';
import { client } from './directus.js'; 

export async function checkRFIDTag(rfidTag) {
  try {
  
    const response = await client.request(readItems('teams', {
      filter: {
        rfid_tag: {
          _eq: rfidTag,
        },
      },
      limit: 1, 
      fields: ['id', 'name', 'email', 'rfid_tag', 'user_created'], 
    }));
    console.log(response)

    const team = response.data[0]; 

    if (team) {
      console.log('RFID Tag exists:', team);
      console.log('User ID:', team.id);
      console.log('Team Name:', team.name);

    } else {
      console.log('RFID Tag does not exist.');
    }
    return team;
  } catch (error) {
    console.error('Error fetching RFID tag:', error);
  }
  return null;
}

checkRFIDTag(12546789);
