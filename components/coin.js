'use client';

import styles from './coin.module.css';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../components/loader';
import { BsArrowLeft, BsArrowUpRight, BsArrowDownRight } from 'react-icons/bs';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0,
      borderWidth: 2,
      borderColor: 'rgba(47,97,68,1)',
      fill: 'start',
      backgroundColor: 'rgba(47,97,68, 0.3)',
    },
    point: {
      radius: 0,
      hitRadius: 5,
    },
  },

  responsive: true,
};

const Coin = () => {
  const [toggle, setToggle] = useState(true);
  const [moneyValue, setMoneyValue] = useState('1000');

  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState([]);

  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  const [currentDay, setCurrentDay] = useState(1);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataSets,
      },
    ],
  };

  const getCurrentPrice = async () => {
    try {
      const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&precision=2";

      const response = await axios.get(url);

      setCurrentPrice(response.data.bitcoin.usd);

    } catch(error) {
      console.log(error);
    }
  }

  const getCoinPrice = async (days = 1) => {
    console.log(days);
    try {
      const priceArray = [];
      const timeArray = [];

      const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`;

      const response = await axios.get(url);

      response.data.prices.forEach((p) => {
        const h = new Date(p[0]).getHours();
        let m = new Date(p[0]).getMinutes();

        if (m < 10) {
          m = `0${m}`;
        }

        if (h < 12) {
          timeArray.push(`${h}:${m} AM`);
        } else {
          timeArray.push(`${h}:${m} PM`);
        }

        priceArray.push(Math.trunc(p[1]));
      });
      setLabels(timeArray);
      setDataSets(priceArray);

      const firstPriceElement = +response.data.prices[0][1].toFixed(2);
      const lastPriceElement = +response.data.prices.pop()[1].toFixed(2);
  

      let percentageChange = +(
        (lastPriceElement / firstPriceElement) * 100 -
        100
      ).toFixed(2);

      const valueChange = +(lastPriceElement - firstPriceElement).toFixed(2);

      setPriceChange({ percentageChange, valueChange });
    } catch (error) {
      console.log(error);
    }
  };

  const setGraphTimeframe = (e) => {
    if (e.target.dataset.day != currentDay) {
      getCoinPrice(e.target.dataset.day);
    }
    setCurrentDay(e.target.dataset.day);
  };

  useEffect(() => {
    getCurrentPrice();
    getCoinPrice();
  }, []);

  const getValue = (e) => {
    setMoneyValue(e.target.innerHTML.replace('$', '').trim());
  };

  const getInputValue = (e) => {
    setMoneyValue(e.target.value);
  };

  const getToggle = (_) => {
    setToggle(!toggle);
  };

  return (
    <>
      <Link href={'/coins'}>
        <BsArrowLeft className={styles.arrow_left} />
      </Link>

      <div className={styles.parent_container}>
        <div className={styles.coin_container}>
          <div className={styles.coin_container_header}>
            <div className={styles.coin_container_header_left}>
              <Image
                alt={'coin'}
                src={
                  'https://lh3.googleusercontent.com/wxhenIWtZgUUQ0mQJatHM3sEBYUEff1DdgP7bWykyl4rVTgkD5frl4Zoa2-WAV1ZkjY9NEINkoSMdhIS8MEOPQ'
                }
                width={27.5}
                height={27.5}
              />
              <p>Bitcoin</p>
              <span>BTC</span>
            </div>
            <div className={styles.coin_container_header_right}>
              <span>➕</span>
              <span>⚙️</span>
            </div>
          </div>

          {dataSets.length > 0 && currentPrice > 0 ? (
            <>
              <div className={styles.coin_container_price_timeframe}>
                <div>
                  <div className={styles.coin_container_current_price}>
                    <p>
                      ${currentPrice} <span>USD</span>
                    </p>
                  </div>
                  <div className={styles.coin_container_price_change}>
                    {priceChange.percentageChange > 0 ? (
                      <>
                        <BsArrowUpRight className={styles.arrow} />
                        <p>
                          +${priceChange.valueChange}
                          <span className={styles.percentage_green}>
                            {' '}
                            ({priceChange.percentageChange}%)
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <BsArrowDownRight className={styles.arrow} />
                        <p>
                          -${priceChange.valueChange}
                          <span className={styles.percentage_red}>
                            {' '}
                            ({priceChange.percentageChange}%)
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.coin_cointainer_timeframe}>
                  <span>1H</span>
                  <span data-day={'1'} onClick={setGraphTimeframe}>
                    1D
                  </span>
                  <span data-day={'7'} onClick={setGraphTimeframe}>
                    1W
                  </span>
                  <span>1Y</span>
                  <span>ALL</span>
                </div>
              </div>
              <div className={styles.coin_container_graph}>
                <Line
                  className={styles.coin_container_graph_line}
                  data={data}
                  width={100}
                  height={40}
                  options={options}
                />
              </div>
            </>
          ) : (
            <Loader />
          )}

          <div className={styles.coin_container_info_footer}>
            <div className={styles.coin_container_info_footer_left}>
              <div>
                <div className={styles.coin_container_info_footer_left_item}>
                  <span>Market cap</span>
                  <p>
                    $1,34M <span>USD</span>
                  </p>
                </div>
                <div className={styles.coin_container_info_footer_left_item}>
                  <span>Volume</span>
                  <p>
                    $453,5K <span>USD</span>
                  </p>
                </div>
              </div>

              <div>
                <div className={styles.coin_container_info_footer_left_item}>
                  <span>Circulating supply</span>
                  <p>
                    $311,5K <span>USD</span>
                  </p>
                </div>
                <div className={styles.coin_container_info_footer_left_item}>
                  <span>All-time high</span>
                  <p>
                    $69,1K <span>USD</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.coin_container_info_footer_right}>
              <span>Trading activity</span>
              <p>BAR</p>
            </div>
          </div>
        </div>
        <div className={styles.trade_container}>
          <h1 className={styles.heading}>Daryti treida</h1>
          <div className={styles.toggle_container}>
            <input
              className={styles.checkbox}
              onChange={getToggle}
              type="checkbox"
              id="switch"
            />
            <div className={styles.app}>
              <div className={styles.body}>
                <label className={styles.label} htmlFor="switch">
                  <div className={styles.toggle}></div>
                  <div className={styles.names}>
                    <p className={styles.light}>PIRKTI</p>
                    <p className={styles.dark}>PARDUOTI</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {toggle ? (
            <>
              <div className={styles.select_container}>
                <label>Kaip daznai?</label>
                <select>
                  <option defaultValue={'Karta'}>Karta</option>
                </select>
              </div>
              <div className={styles.select_container}>
                <label>Uz kiek?</label>
                <input
                  type={'text'}
                  onChange={getInputValue}
                  defaultValue={moneyValue}
                />
              </div>
              <div className={styles.sums_container}>
                <div>
                  $<span onClick={getValue}>50</span>
                </div>
                <div>
                  $<span onClick={getValue}>100</span>
                </div>
                <div>
                  $<span onClick={getValue}>250</span>
                </div>
                <div>
                  $<span onClick={getValue}>500</span>
                </div>
                <div>
                  $<span onClick={getValue}>1000</span>
                </div>
                <div>
                  $<span onClick={getValue}>2000</span>
                </div>
              </div>
              <button className={styles.buy_button}>PIRKTI</button>
              <p>Ieskai kitokiu budu pirkti?</p>
            </>
          ) : (
            <>
              <div className={styles.select_container}>
                <label>Kaip daznai?</label>
                <select>
                  <option defaultValue={'Karta'} selected>
                    Karta
                  </option>
                </select>
              </div>
              <div className={styles.select_container}>
                <label>Uz kiek?</label>
                <input
                  type={'text'}
                  onChange={getInputValue}
                  defaultValue={moneyValue}
                />
              </div>
              <div className={styles.sums_container}>
                <div>
                  $<span onClick={getValue}>50</span>
                </div>
                <div>
                  $<span onClick={getValue}>100</span>
                </div>
                <div>
                  $<span onClick={getValue}>250</span>
                </div>
                <div>
                  $<span onClick={getValue}>500</span>
                </div>
                <div>
                  $<span onClick={getValue}>1000</span>
                </div>
                <div>
                  $<span onClick={getValue}>2000</span>
                </div>
              </div>
              <button className={styles.buy_button}>PARDUOTI</button>
              <p>Ieskai kitokiu budu pirkti?</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Coin;
