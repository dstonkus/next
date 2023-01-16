import Link from 'next/link';

const StartPage = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Link href={'/coins'}>Coins</Link>
    </>
  );
};

export default StartPage;
