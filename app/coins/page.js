import Link from 'next/link';
import CoinList from '../../components/coinList';
import Layout from '../../components/layout';

const Coins = () => {
  return (
    <Layout>
      <Link href="/">Home</Link>
      <CoinList />
    </Layout>
  );
};

export default Coins;
