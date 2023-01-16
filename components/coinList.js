import styles from './coinList.module.css';
import Image from 'next/image';
import Link from 'next/link';

const CoinList = () => {
  return (
    <div className={styles.parent_container}>
      <Link href="/coins/bitcoin">
        <div className={styles.child_container}>
          <div>
            <Image
              alt={'coin'}
              src={
                'https://lh3.googleusercontent.com/wxhenIWtZgUUQ0mQJatHM3sEBYUEff1DdgP7bWykyl4rVTgkD5frl4Zoa2-WAV1ZkjY9NEINkoSMdhIS8MEOPQ'
              }
              width={30}
              height={30}
            />
            <p>Bitcoin</p>
          </div>
          <p>Price: $23,233</p>
          <p>Change +1,24%</p>
          <p>7 Days Chart</p>
          <p>Refresh</p>
        </div>
      </Link>
      <div className={styles.child_container}>
        <p>Bitcoin</p>
        <p>Price: $23,233</p>
        <p>Change +1,24%</p>
        <p>7 Days Chart</p>
        <p>Refresh</p>
      </div>
      <div className={styles.child_container}>
        <p>Bitcoin</p>
        <p>Price: $23,233</p>
        <p>Change +1,24%</p>
        <p>7 Days Chart</p>
        <p>Refresh</p>
      </div>
      <div className={styles.child_container}>
        <p>Bitcoin</p>
        <p>Price: $23,233</p>
        <p>Change +1,24%</p>
        <p>7 Days Chart</p>
        <p>Refresh</p>
      </div>
      <div className={styles.child_container}>
        <p>Bitcoin</p>
        <p>Price: $23,233</p>
        <p>Change +1,24%</p>
        <p>7 Days Chart</p>
        <p>Refresh</p>
      </div>
    </div>
  );
};

export default CoinList;
