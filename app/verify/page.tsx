import Link from "next/link";

interface VerifyPageProps {
  searchParams: { email?: string };
}

export default function Verify() {
  // const email = searchParams.email;

  return (
    <>
      {/* <div>Verify {email}</div> */}
      <Link href="/" className="text-blue-600 underline">
        change email
      </Link>
    </>
  );
}
