// import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uarwpysaogctajpbqxuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcndweXNhb2djdGFqcGJxeHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Njk3NzYsImV4cCI6MjA2NDI0NTc3Nn0.ADQh7TzFKYawmcfVP-PbpFaewLYpQdPTLBvvIKwb3p4'

export const supabase = createClient(supabaseUrl, supabaseKey)