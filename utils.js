export function getUserObject(userId){
    //TODO: get user object from directus
}

export function handleUserEntryAndExit(userObject){
    //TODO: if userObject has intime set then set outtime to current time and post to directus
    //TODO: elsre userObject has no intime set then set intime to current time and post to directus
}

export function resetUserObject(userId){
    //TODO: get all users with intime set and outtime not set.
    //TODO: set their outime to current time
    //TODO: call from a parent function everyday at 12am
}