import { supabase } from "@/integrations/supabase/client";
export const money=(value:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(value);
export const percent=(value:number)=>new Intl.NumberFormat("pt-BR",{maximumFractionDigits:1}).format(value)+"%";
export async function getCurrentUser(){const {data,error}=await supabase.auth.getUser();if(error)throw error;return data.user;}
export async function signOut(){const {error}=await supabase.auth.signOut();if(error)throw error;}
