import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://cuahixqhfpcpsclceipx.supabase.co",
  "sb_publishable_C_T1ZhW88SUImeUlMpFnaw_Uugy1q7k"
);


/* console.log("Supabase URL:", supabaseUrl)
//console.log("Supabase Key:", supabaseAnonKey) 
// export const supabase = createClient(supabaseUrl, supabaseAnonKey); */

export default supabase;

