import React, { useState, useEffect, useRef, useContext } from 'react';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Filler } from "chart.js";
import useFormatter from "../../../hook/formatter";
import useLiveStats from "../../../hook/livestats";
import { HiloContext } from "../store";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler
);

const LiveStats = ({ onClose }) => {
  const { liveStats } = useContext(HiloContext);
  const chartContainerRef = useRef(null);
  const draggableContainerRef = useRef(null);
  const { removeTrailingZeros, getSuffix } = useFormatter();
  const { getStats, resetStats } = useLiveStats(liveStats, "HILO_LIVE_STATS");
  const [stats, setStats] = useState(getStats());
  const [chartInstance, setChartInstance] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 150,
    y: window.innerHeight / 2 - 227
  });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newStats =  getStats();
    setStats(newStats);
  }, [liveStats]);

  useEffect(() => {
    if (chartContainerRef.current && stats) {
      const ctx = chartContainerRef.current.getContext("2d");
      if (chartInstance) {
        chartInstance.destroy();
      }
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: stats.points.length }, (_, i) => `${i}`),
          datasets: [
            {
              data: stats.points.map((p) => (p > 0 ? p : 0)),
              fill: true,
              backgroundColor: "rgba(93, 160, 0, 0.8)",
              borderColor: "#5da000",
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#FFFFFF",
              borderWidth: 3,
              tension: 0.3,
            },
            {
              data: stats.points.map((p) => (p < 0 ? p : 0)),
              fill: true,
              backgroundColor: "rgba(237, 99, 0, 0.8)",
              borderColor: "#ed6300",
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#FFFFFF",
              borderWidth: 3,
              tension: 0.3,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              mode: "nearest",
              intersect: false,
              callbacks: {
                label: function (context) {
                  return !!context.parsed.y ? parseFloat(context.parsed.y).toFixed(4) : "";
                },
              },
            },
          },
          scales: {
            x: {
              display: false,
              stacked: true,
            },
            y: {
              display: false,
              stacked: true,
            },
          },
        },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainerRef, stats]);

  useEffect(() => {
    if (chartInstance && stats) {
      chartInstance.data.labels = Array.from(
        { length: stats.points.length },
        (_, i) => `${i}`
      );
      chartInstance.data.datasets[0].data = stats.points.map((p) =>
        p > 0 ? p : 0
      );
      chartInstance.data.datasets[1].data = stats.points.map((p) =>
        p < 0 ? p : 0
      );
      chartInstance.update();
    }
  }, [chartInstance, stats]);

  const handleResetStats = () => {
    resetStats(stats.token_img);
  };

  const handlePointDown = (e) => {
    setDragging(true);
    setInitialPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handlePointerMove = (e) => {
    if (dragging) {
      const maxX = window.innerWidth - draggableContainerRef.current.clientWidth;
      const maxY = window.innerHeight - draggableContainerRef.current.clientHeight;
      setPosition({
        x: Math.min(Math.max(e.clientX - initialPosition.x, 0), maxX),
        y: Math.min(Math.max(e.clientY - initialPosition.y, 0), maxY)
      });
    }
  };

  useEffect(() => {
    const stopDragging = () => {
      setDragging(false);
    };
    document.addEventListener("pointerup", stopDragging);
    return () => {
      document.removeEventListener("pointerup", stopDragging);
    };
  }, []);

  return (
    <div
      ref={draggableContainerRef}
      onPointerMove={handlePointerMove}
      className="sc-dJjYzT JLcsN dragpop"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div
        onPointerDown={handlePointDown}
        className={`dragpop-title ${dragging ? 'grabbing' : ''}`}
      >
        Live Stats
      </div>
      <button onClick={onClose} className="dragpop-close hover">
        <svg
          xmlns="http://www.w3.org/1999/xlink"
          className="sc-gsDKAQ hxODWG icon">
          <use xlinkHref="#icon_Close"></use>
        </svg>
      </button>
      <div className="dragpop-content">
        <div className="sc-dkPtRN jScFby scroll-view sc-eBTqsU eLzuEc">
          <div className="sc-zjkyB jElDBn">
            <div className="trigger flex-center m-item fold">
              <div className="current">Bet</div>
              <svg
                xmlns="http://www.w3.org/1999/xlink"
                className="sc-gsDKAQ hxODWG icon"
              >
                <use xlinkHref="#icon_Arrow"></use>
              </svg>
            </div>
          </div>
          <div className="sc-jHwEXd dQxvCn m-item">
            <div className="title flex-center">
              <span>Bet</span>
              <button onClick={handleResetStats} className="title-btn">
                <svg
                  xmlns="http://www.w3.org/1999/xlink"
                  className="sc-gsDKAQ hxODWG icon"
                >
                  <use xlinkHref="#icon_Clear"></use>
                </svg>
              </button>
            </div>
            <div className="chart-cont">
              <div className="item-wrap wagered">
                <div className="item-label">Wagered</div>
                <div className="sc-Galmp erPQzq coin notranslate">
                  <img alt="" className="coin-icon" src={stats.token_img} />
                  <div className="amount">
                    <span className="amount-str">
                      {removeTrailingZeros(stats.wagered.toFixed(6))}
                      <span className="suffix">
                        {getSuffix(stats.wagered.toFixed(6))}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="item-wrap profit">
                <div className="item-label">Profit</div>
                <div
                  className={`sc-Galmp erPQzq coin notranslate ${
                    stats.profit > 0 ? 'cl-success' : 'cl-require'
                  }`}
                >
                  <img alt="" className="coin-icon" src={stats.token_img} />
                  <div className="amount">
                    <span className="amount-str">
                      {removeTrailingZeros(Math.abs(stats.profit).toFixed(6))}
                      <span className="suffix">
                        {getSuffix(Math.abs(stats.profit).toFixed(6))}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-wrap">
              <canvas ref={chartContainerRef}></canvas>
            </div>
            <div className="bet-wrap">
              <div className="bet-item win">
                <span className="txt ttc">win</span>
                <span className="num cl-success">{stats.wins}</span>
              </div>
              <div className="bet-item lose">
                <span className="txt ttc">lose</span>
                <span className="num false">{stats.loses}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
