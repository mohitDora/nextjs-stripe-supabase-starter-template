import Link from "next/link";

export default function Verify({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email;

  return (
    <>
      <div>Verify {email}</div>
      <Link href="/" className="text-blue-600 underline">
        change email
      </Link>
    </>
  );
}
