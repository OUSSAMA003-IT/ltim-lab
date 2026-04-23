import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wtqavvnikzgcezmnwbhh.supabase.co"
const supabaseKey = "sb_publishable_RvyDXqsKHIvmM26GAHdBuw_h5mwRXFm"

export const supabase = createClient(supabaseUrl, supabaseKey)




