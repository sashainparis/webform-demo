"use client"

import { redirect } from "next/navigation";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextArea from '@mui/material/TextareaAutosize';

export default function FormMision() {
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
            className="flex-1 flex flex-col w-full mx-auto justify-center gap-y-2 text-foreground"
            // action={saveSupabase}
            noValidate
            autoComplete="off"
        >
            <label>
                Title
            </label>
            <TextField
                variant="outlined"
                name="mission_title"
                className="bg-white"
                defaultValue={getToLocalStorage("mission_title")}
                placeholder="Client, project, ..."
                required
                onChange={event => setToLocalStorage(event.target.name, event.target.value)}
            />
            <label>
                Description
            </label>
            <TextArea
                minRows={3}
                name="mission_description"
                className="bg-white"
                defaultValue={getToLocalStorage("mission_description")}
                placeholder="Make it short or long, but make it good."
                required
                onChange={event => setToLocalStorage(event.target.name, event.target.value)}
            />
            <label>
                Role / Position
            </label>
            <TextField
                // label="API Key"
                name="mission_role"
                className="bg-white"
                defaultValue={getToLocalStorage("mission_role")}
                placeholder="name"
                required
                onChange={event => setToLocalStorage(event.target.name, event.target.value)}
            />
        </Box>
    );
}
