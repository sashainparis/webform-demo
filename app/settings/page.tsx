"use client"

import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const saveSupabase = async (formData: FormData) => {
        return redirect("/ok");
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
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link>

            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={saveSupabase}
            >
                <label className="text-md" htmlFor="supabase_url">
                    URL
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="supabase_url" 
                    defaultValue={getToLocalStorage("supabase_url")}
                    placeholder="httsp://..."
                    required
                    onChange={event => setToLocalStorage(event.target.name, event.target.value)}
                />
                <label className="text-md" htmlFor="supabase_key">
                    API Key
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="supabase_key"
                    defaultValue={getToLocalStorage("supabase_key")}
                    placeholder="f245ez..."
                    required
                    onChange={event => setToLocalStorage(event.target.name, event.target.value)}
                />
                <button className="bg-green-700 rounded-md px-4 py-2 text-white mb-2">
                    Save settings
                </button>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    );
}
