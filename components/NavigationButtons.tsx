import Link from '@mui/material/Link';

export default function NavigationButtons() {
  return (
    <>
      <Link
        className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
        href="/contact"
      >
        Contact
      </Link>
    </>
  );
}
