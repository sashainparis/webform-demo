import Link from '@mui/material/Link';

export default function SettingsButtons() {
  return (
    <>
      <Link
        className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
        href="/sync"
      >
        Sync
      </Link>
      <Link
        className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
        href="/settings"
      >
        Settings
      </Link>
    </>
  );
}
