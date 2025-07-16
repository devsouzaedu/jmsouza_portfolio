import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rzaottritwvlhcxxnylw.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YW90dHJpdHd2bGhjeHhueWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTAzMTIsImV4cCI6MjA1ODA2NjMxMn0.iQd2s9aJ7Nr-QfnElDzzyh-mlJaIoZE_zHGxp01WtqU";

// Criar o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface EbookLead {
  id?: string;
  email: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export default supabase; 