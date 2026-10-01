"use client";

import { createClient } from "@/lib/supabase/client";

export async function Logout(){
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if( error ){
        throw new Error(error.message);
    }
}