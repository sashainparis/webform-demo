import Link from '@mui/material/Link';

type Props = {
  title: string
}

export default function TitlePage({title}: Props) {
  return (
    <>
      <h1 className="text-2xl py-8 font-bold">{title}</h1>
    </>
  );
}
