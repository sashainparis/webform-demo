import Card from '@mui/material/Card';

type Props = {
    title: string,
    children: React.ReactNode
}

export default function DashboardCard({ title, children }: Props) {
    return (
        <>
            <Card
                variant="outlined"
                className="bg-white rounded-xl p-4"
            >
                <h2 className="text-xl pb-4 font-bold text-center">{title}</h2>
                {children}
            </Card>
        </>
    )
}
