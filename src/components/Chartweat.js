/* eslint-disable react/jsx-no-duplicate-props */
import React, { PureComponent } from 'react';
import LineChart from './Linechart';
import { Line } from "react-chartjs-2";
export default function Chartweat(props) {
    function timeconvert(time) {
        var myDate = new Date(time * 1000);
        return myDate.toLocaleTimeString();
    }
    const { data } = props;
    // console.log(data)
    const [userData, setUserData] = React.useState({ labels: ['a', 'b', 'c'], datasets: [{ data: [1, 2, 3] }] });
    React.useEffect(() => {
        setUserData({
            labels: data?.hourly.slice(0, 24).map((item) => timeconvert(item.dt)),
            datasets: [
                {
                    label: "Next 24 Hours Temp.",
                    data: data?.hourly.slice(0, 24).map((item) => item.temp),
                    borderColor: "#254e58",
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderWidth: 2,
                },
            ],
        })
    }, [data]);
    return (
        <div style={{ backgroundColor: '#88BCBD', padding: '50px 0' }}>
            <Line className='container' style={{ height: '400px', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: '15px', padding: "10px" }} data={userData} options={{ maintainAspectRatio: false }} options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'black',
                            font: {
                                size: 18,
                                family: 'Source Sans Pro'
                            }
                        }
                    }
                },
                scales: {
                    yAxes: {
                        grid: {
                            drawBorder: true,
                            color: '#254e58',
                        },
                        ticks: {
                            beginAtZero: true,
                            color: '254e58',
                            fontSize: 14,
                        }
                    },
                    xAxes: {
                        grid: {
                            drawBorder: true,
                            color: '#254e58',
                        },
                        ticks: {
                            beginAtZero: true,
                            color: '254e58',
                            fontSize: 14,
                        }
                    },
                }
            }} />
        </div>
    )
}

