import Box from '@mui/material/Box';

type Props = {
    // action: (formData: FormData) => Promise<void>,
    children: React.ReactNode,
}

export default function WebformBox({ children }: Props) {
    return (
        <Box
            component="form"
            className="flex-1 flex flex-col w-full p-4 my-8 bg-pink-300 md:w-96 mx-auto justify-center gap-y-2 text-foreground"
            noValidate
            autoComplete="off"
        >
            {children}
        </Box>
    )
}
