import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rzaottritwvlhcxxnylw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YW90dHJpdHd2bGhjeHhueWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTAzMTIsImV4cCI6MjA1ODA2NjMxMn0.iQd2s9aJ7Nr-QfnElDzzyh-mlJaIoZE_zHGxp01WtqU';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YW90dHJpdHd2bGhjeHhueWx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjQ5MDMxMiwiZXhwIjoyMDU4MDY2MzEyfQ.NRC6ngONao7liCXvcaR2efNE1XdweGgFHB-CfEa6zcM';

// Cliente para uso no cliente (usuários anônimos)
export const supabaseBlog = createClient(supabaseUrl, supabaseAnonKey);

// Cliente para uso no servidor (acesso completo)
export const supabaseBlogAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Tipo para os posts do blog
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
} 