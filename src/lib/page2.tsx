'use client'
import { supabase } from '../lib/supabaseClient'
import signUp from '../api/signUp'
import { useEffect, useState } from 'react'
export default function Home() {

    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            setResult(JSON.stringify(await signUp("kishorforclass@gmail.com", "password123")));
        };
        fetchResult();
    }, []);

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files ? event.target.files[0] : null
        if (!file) return;
        const fileExt = file.name.split('.').pop()
        const filePath = (Date.now() + '.' + fileExt).toString()
        const { data, error } = await supabase.storage
            .from('tech')
            .upload(filePath, file)
        if (error) {
            setResult(`Upload error: ${error.message}`);
        } else {
            setResult(`File uploaded: ${data?.path}`);
        }
    }
    return (<>
        {result && <p>{result}</p>}
        <h1>Hello</h1>
        <input type='file' onChange={handleUpload} />
    </>)
}
