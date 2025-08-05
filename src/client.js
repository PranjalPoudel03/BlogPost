import { createClient } from '@supabase/supabase-js'

const URL = 'https://gicwyporzwthasgwcfvv.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY3d5cG9yend0aGFzZ3djZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTI4NDMsImV4cCI6MjA2ODg4ODg0M30.tcwJQmCV1gvx2xpnAKYqOePsdjCYAY9HAKSUIQDYQ6c'

export const supabase = createClient(URL, API_KEY)

