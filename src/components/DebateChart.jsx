import React from "react";
import { ResponsiveStream } from "@nivo/stream";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveStream = ({ data /* see data tab */ }) => (
  <ResponsiveStream
    data={data}
    keys={["Pro", "Con"]}
    margin={{ top: 5, right: 5, bottom: 50, left: 55 }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Day",
      legendOffset: 36,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 12,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Sats",
      legendOffset: -50,
      format: (values) => `${values / 1000}k`,
    }}
    offsetType="diverging"
    colors={["#70e0b5", "#55b3b9"]}
    fillOpacity={0.85}
    borderColor={{ theme: "background" }}
    dotSize={8}
    dotColor={{ from: "color" }}
    dotBorderWidth={2}
    dotBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
    animate={true}
    tooltipFormat
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        translateX: 15,
        itemWidth: 80,
        itemHeight: 20,
        itemTextColor: "#999999",
        symbolSize: 12,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000000",
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveStream;
