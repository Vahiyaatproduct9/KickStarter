import { createClient } from '@supabase/supabase-js'
const NEXT_PUBLIC_SUPABASE_URL = 'https://tcwcpjkachqmdbmehrel.supabase.co'
const NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjd2NwamthY2hxbWRibWVocmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODAzNjksImV4cCI6MjA2NzM1NjM2OX0.z5mr22xj19Nj8Um5j42S5Ie17M5xKOoCvEkTMnsjnqY'
const supabaseAdminKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjd2NwamthY2hxbWRibWVocmVsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTc4MDM2OSwiZXhwIjoyMDY3MzU2MzY5fQ.653cDoyC_CtP0UXk0S5GQo8A-nmD9_wdPI-gU4MKp3U'
const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseKey) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}
const supabase = createClient(supabaseUrl, supabaseAdminKey)

const { data, error } = await supabase.auth.admin.updateUserById('47d37a91-d8f0-497b-896c-20e1b07ead92', {

    user_metadata: {
        user_id: 'kishor_dih'
    }
});
console.log(data)