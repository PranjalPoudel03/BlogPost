import { supabase } from "../client";

/**
 * Gets the currently logged-in user.
 @returns {Promise<object|null>} The user object or null if not logged in.
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error.message);
    return null;
  }
  return data?.user || null;
}


export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error logging out:", error.message);
  }
}
