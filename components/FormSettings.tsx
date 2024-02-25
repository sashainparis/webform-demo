"use client"

import { redirect } from "next/navigation";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormSettings() {
    const saveSupabase = async (formData: FormData) => {
        return redirect("/sync");
    }

    const setToLocalStorage = (name: string, value: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(name, value)
        }
    }
    const getToLocalStorage = (name: string) => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(name) || undefined
        }
    }

    return (
        <Box
            component="form"
            className="flex-1 flex flex-col w-full md:w-96 mx-auto justify-center gap-y-2 text-foreground"
            action={saveSupabase}
            noValidate
            autoComplete="off"
        >
            <label>
                URL
            </label>
            <TextField
                // label="URL"
                variant="outlined"
                name="supabase--url"
                className="bg-white"
                defaultValue={getToLocalStorage("supabase--url")}
                placeholder="httsp://..."
                required
                onChange={event => setToLocalStorage(event.target.name, event.target.value)}
            />
            <label>
                API Key
            </label>
            <TextField
                // label="API Key"
                name="supabase--key"
                className="bg-white"
                defaultValue={getToLocalStorage("supabase--key")}
                placeholder="f245ez..."
                required
                onChange={event => setToLocalStorage(event.target.name, event.target.value)}
            />
            <button className="bg-pink-500 rounded-md px-4 py-2 text-white mb-2">
                Test connection
            </button>
        </Box>
    );
}
