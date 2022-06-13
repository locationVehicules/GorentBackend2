import React, { useState, useEffect } from "react";
import { DisplayTable } from "../components/tables";
import { Main } from "../components/Main";
import * as d3 from "d3";
import * as topojson from "topojson";

import rentCities from "../GetSetData/rentCities.json";
import returnCities from "../GetSetData/returnCities.json";
import categoryCities from "../GetSetData/categoryCities.json";
import geoData from "../GetSetData/geoData.json";
import "../css/gerer_stat_style.css";

export const Status = () => {
  const [rentL, setRentL] = useState(true);
  const [returnL, setReturnL] = useState(false);
  const [category, setCategory] = useState(false);

  const [rentLActive, setRentLActive] = useState("active");
  const [returnLActive, setReturnLActive] = useState("");
  const [categoryActive, setCategoryActive] = useState("");

  const ChangeFunction = (e) => {
    const targetVal = e.target.value;
    switch (targetVal) {
      case "rentL":
        setRentL(true);
        setReturnL(false);
        setCategory(false);
        setRentLActive("active");
        setReturnLActive("");
        setCategoryActive("");
        break;
      case "returnL":
        setRentL(false);
        setReturnL(true);
        setCategory(false);
        setRentLActive("");
        setReturnLActive("active");
        setCategoryActive("");
        break;
      case "category":
        setRentL(false);
        setReturnL(false);
        setCategory(true);
        setRentLActive("");
        setReturnLActive("");
        setCategoryActive("active");
        break;
      default:
        break;
    }
  };
  let driversItems = ["1", "SAFA", "BENABDESSADOK", "C"];
  let drivers = [];
  for (let i = 0; i < 15; i++) {
    drivers.push(driversItems);
  }
  let employeesItems = [
    "Safa",
    "BENABDESSADOK",
    "Admin",
    "Supervisor",
    "Touggourt",
    "30h",
  ];
  let employees = [];
  for (let i = 0; i < 15; i++) {
    employees.push(employeesItems);
  }
  return (
    <Main title={"Status"}>
      <div className="container-fluid">
        <div className="d-flex flex-wrap justify-content-center">
          <div className="container table-con col-md-5 p-3 m-3">
            <RenterTypes />
          </div>
          <div className="container table-con col-md-5 p-3 m-3">
            <VehiclesState />
          </div>
        </div>
      </div>

      <div className="btn-group" role="group" aria-label="">
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${rentLActive}`}
          onClick={ChangeFunction}
          value="rentL"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Most Rent Location
        </button>
        <button
          type="button"
          className={`nbtn btn btn-secondary navbtns ${returnLActive}`}
          onClick={ChangeFunction}
          value="returnL"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Most Return Location
        </button>
        <button
          type="button"
          className={`btn btn btn-secondary navbtns ${categoryActive}`}
          onClick={ChangeFunction}
          value="category"
          style={{
            backgroundColor: "var(--btn_color1)",
            fontWeight: "bold",
          }}
        >
          Most Rent Category
        </button>
      </div>

      {rentL && <RentLocations />}
      {returnL && <ReturnLocations />}
      {category && <CategoryLocations />}

      <DisplayTable
        tableTitle="Drivers ordered according to number of infractions"
        headerList={[
          "ID",
          "FIRST NAME",
          "SECOND NAME",
          "DRIVING LICENSE CATEGORY",
        ]}
        bodyLines={drivers}
      />

      <DisplayTable
        tableTitle="Employees ordered according to work time"
        headerList={[
          "FIRST NAME",
          "SECOND NAME",
          "POST",
          "GRADE",
          "AGENCY LOCATION",
          "WORK TIME",
        ]}
        bodyLines={employees}
      />
    </Main>
  );
};

export const RentLocations = () => {
  useEffect(() => {
    const width = 400;
    const height = 400;

    const svgSection = d3.select("#rent-locations-section");
    let svg = d3.select("#rent-locations");
    svg && svg.remove();

    svgSection
      .append("svg")
      .attr("id", "rent-locations")
      .attr("viewBox", "40 0 400 250");

    svg = d3.select("#rent-locations");
    const projection = d3
      .geoMercator()
      .scale(650)
      .translate([width / 2.4, height * 1.15]);

    const path = d3.geoPath(projection);

    const g = svg.append("g");

    const city = topojson.feature(geoData, geoData.objects.geoData);
    g.selectAll("path")
      .data(city.features)
      .enter()
      .append("path")
      .attr("class", "city")
      .attr("d", path)
      .attr("fill", "#c1c1c1")
      .attr("stroke", "#d2d1d1");

    const maxRadius = 8;
    const sizeScale = d3
      .scaleSqrt()
      .domain([0, d3.max(rentCities, (d) => d.value)])
      .range([2, maxRadius]);

    rentCities.map((d) => {
      svg
        .append("circle")
        .attr("cx", d.latitude)
        .attr("cy", d.longitude)
        .attr("r", sizeScale(d.value))
        .attr("fill", "#1d793f")
        .attr("opacity", 0.3)
        .on("mouseover", () => {
          svg
            .append("text")
            .attr("x", 285)
            .attr("y", 50)
            .attr("class", "Number")
            .attr("fill", "#1d793f").html(`
    <tspan>${d.name_ascii}</tspan><tspan x=285  y= 70 > ${d.value} </tspan>
  `);
        })
        .on("mouseout", () => {
          svg.select("text").remove();
        });
    });
  });
  return (
    <>
      <h1 className="m-auto my-2">Most Rent Location</h1>
      <main
        className="m-auto"
        style={{
          background: "#fff",
          width: "80vw",
          maxWidth: "750px",
          boxShadow: "0 2px 15px hsla(0, 0%, 0%, 0.2)",
          borderRadius: "12px",
        }}
      >
        <section
          id="rent-locations-section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3rem 1rem",
          }}
        ></section>
      </main>
    </>
  );
};

export const ReturnLocations = () => {
  useEffect(() => {
    const width = 400;
    const height = 400;

    const svgSection = d3.select("#return-locations-section");
    let svg = d3.select("#return-locations");
    svg && svg.remove();

    svgSection
      .append("svg")
      .attr("id", "return-locations")
      .attr("viewBox", "40 0 400 250");

    svg = d3.select("#return-locations");

    const projection = d3
      .geoMercator()
      .scale(650)
      .translate([width / 2.4, height * 1.15]);

    const path = d3.geoPath(projection);

    const g = svg.append("g");

    const city = topojson.feature(geoData, geoData.objects.geoData);
    g.selectAll("path")
      .data(city.features)
      .enter()
      .append("path")
      .attr("class", "city")
      .attr("d", path)
      .attr("fill", "#c2c1c1")
      .attr("stroke", "#d2d1d1");

    const maxRadius = 8;
    const sizeScale = d3
      .scaleSqrt()
      .domain([0, d3.max(returnCities, (d) => d.value)])
      .range([2, maxRadius]);

    returnCities.map((d) => {
      svg
        .append("circle")
        .attr("cx", d.latitude)
        .attr("cy", d.longitude)
        .attr("r", sizeScale(d.value))
        .attr("fill", "#062485")
        .attr("opacity", 0.3)
        .on("mouseover", () => {
          svg
            .append("text")
            .attr("x", 270)
            .attr("y", 50)
            .attr("class", "Number")
            .attr("fill", "#3739b5").html(`
    <tspan>${d.name_ascii}</tspan><tspan x=270  y= 70 > ${d.value} </tspan>
  `);
        })
        .on("mouseout", () => {
          svg.select("text").remove();
        });
    });
  });
  return (
    <>
      <h1 className="m-auto my-2">Most Rrturn Location</h1>
      <main
        className="m-auto"
        style={{
          background: "#fff",
          width: "80vw",
          maxWidth: "750px",
          boxShadow: "0 2px 15px hsla(0, 0%, 0%, 0.2)",
          borderRadius: "12px",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3rem 1rem",
          }}
          id="return-locations-section"
        ></section>
      </main>
    </>
  );
};

export const CategoryLocations = () => {
  useEffect(() => {
    console.log(document.querySelectorAll("section")[1]);
    const width = 400;
    const height = 400;

    const svgSection = d3.select("#category-locations-section");
    let svg = d3.select("#category-locations");
    svg && svg.remove();

    svgSection
      .append("svg")
      .attr("id", "category-locations")
      .attr("viewBox", "40 0 400 250");

    svg = d3.select("#category-locations");

    const projection = d3
      .geoMercator()
      .scale(650)
      .translate([width / 2.4, height * 1.15]);

    const path = d3.geoPath(projection);

    const g = svg.append("g");

    const city = topojson.feature(geoData, geoData.objects.geoData);
    g.selectAll("path")
      .data(city.features)
      .enter()
      .append("path")
      .attr("class", "city")
      .attr("d", path)
      .attr("fill", "#c2c1c1")
      .attr("stroke", "#d2d1d1");

    categoryCities.map((d) => {
      svg
        .append("circle")
        .attr("cx", d.latitude)
        .attr("cy", d.longitude)
        .attr("r", 3)
        .attr("fill", "#062485")
        .attr("opacity", 0.3)
        .on("mouseover", () => {
          svg
            .append("text")
            .attr("x", 270)
            .attr("y", 50)
            .attr("class", "Number")
            .attr("fill", "#3739b5").html(`
    <tspan>${d.name_ascii}</tspan><tspan x=270  y= 70 > ${d.category} </tspan>
  `);
        })
        .on("mouseout", () => {
          svg.select("text").remove();
        });
    });
  });
  return (
    <>
      <h1 className="m-auto my-2">Most rented type by location</h1>
      <main
        className="m-auto"
        style={{
          background: "#fff",
          width: "80vw",
          maxWidth: "750px",
          boxShadow: "0 2px 15px hsla(0, 0%, 0%, 0.2)",
          borderRadius: "12px",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "3rem 1rem",
          }}
          id="category-locations-section"
        ></section>
      </main>
    </>
  );
};

export const VehiclesState = () => {
  useEffect(() => {
    // input data
    const data = [
      {
        name: "rended",
        percentage: 60, // percentage
        value: 1200,
        color: "#00A389",
      },
      {
        name: "garage",
        percentage: 30,
        value: 600,
        color: "#FF9C07",
      },
      {
        name: "under",
        percentage: 10,
        value: 200,
        color: "#FF4C4C",
      },
    ];

    const svgSection = d3.select("#vehicles-state-section");
    let svg = d3.select("#vehicles-state");
    svg && svg.remove();

    svgSection
      .append("svg")
      .attr("id", "vehicles-state")
      .attr("viewBox", "0 0 400 250");

    svg = d3.select("#vehicles-state");

    const viewBox = svg.attr("viewBox");
    const regexViewBox = /\d+ \d+ (\d+) (\d+)/;

    const [, viewBoxWidth, viewBoxHeight] = viewBox
      .match(regexViewBox)
      .map((item) => Number.parseInt(item, 10));
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };
    const width = viewBoxWidth - (margin.left + margin.right);
    const height = viewBoxHeight - (margin.top + margin.bottom);

    const radius = Math.min(width, height) / 2;
    const strokeWidth = 40;

    const group = svg
      .append("g")
      .attr("transform", `translate(${margin.left} ${margin.top})`);

    const groupDefault = group
      .append("g")
      .attr("transform", `translate(${width / 2} ${height / 2})`);

    groupDefault
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", radius)
      .attr("transform", "rotate(-90)")
      .attr("fill", "none")
      .attr("stroke", "hsla(0, 0%, 0%, 0.08")
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linecap", "round")
      .attr("stroke-dasharray", radius * 3.14 * 2)
      .attr("stroke-dashoffset", radius * 3.14 * 2);

    const pie = d3
      .pie()
      .sort(null)
      .padAngle(0.25)
      .value((d) => d.value);

    const arc = d3.arc().innerRadius(radius).outerRadius(radius);

    const groupArcs = group
      .append("g")
      .attr("transform", `translate(${width / 2} ${height / 2})`);

    const groupsArcs = groupArcs
      .selectAll("g")
      .data(pie(data))
      .enter()
      .append("g");

    groupsArcs
      .append("path")
      .attr("d", arc)
      .attr("fill", "none")
      .attr("stroke", (d) => d.data.color)
      .attr("stroke-width", strokeWidth * 0.8)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-dasharray", radius * 3.14 * 2)
      .attr("stroke-dashoffset", radius * 3.14 * 2)
      .on("mouseover", (data, e) => {
        svg
          .append("text")
          .attr("x", "50%")
          .attr("y", "50%")
          .attr("dominant-baseline", "middle")
          .attr("text-anchor", "middle")
          .attr("font-size", 30)
          .attr("position", "absolute")
          .attr("fill", e.data.color)
          .attr("stroke", e.data.color)
          .html(
            `
    <tspan y=40%>${e.data.name}</tspan><tspan x=50% y=60%> ${e.data.percentage} % </tspan>
  `
          );
      })
      .on("mouseout", () => {
        svg.select("text").remove();
      });

    groupDefault
      .select("circle")
      .transition()
      .ease(d3.easeExp)
      .delay(200)
      .duration(2000)
      .attr("stroke-dashoffset", "0")
      .on("end", () => {
        const paths = document.querySelectorAll("svg g g path");
        paths.forEach((path) => {
          const length = path.getTotalLength();
          path.setAttribute("stroke-dasharray", length);
          path.setAttribute("stroke-dashoffset", length);
        });

        const duration = 1000;
        // transition the path elements to stroke-dashoffset 0
        d3.selectAll("svg g g path")
          .transition()
          .ease(d3.easeLinear)
          .delay((d, i) => i * duration)
          .duration(duration)
          .attr("stroke-dashoffset", 0);
      });
  });
  return (
    <>
      <main>
        <section id="vehicles-state-section"></section>
      </main>
    </>
  );
};

export const RenterTypes = () => {
  useEffect(() => {
    const data = [
      { renter: "Enterprise", Number: 350, color: "#4C3F91" },
      { renter: "Person", Number: 700, color: "#9145B6" },
    ];

    const margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    };

    const svgSection = d3.select("#renter-types-section");
    let svg = d3.select("#renter-types");
    svg && svg.remove();

    svgSection
      .append("svg")
      .attr("id", "renter-types")
      .attr("viewBox", "-60 0 600 400");

    svg = d3.select("#renter-types");

    const viewBox = svg.attr("viewBox");
    const regexViewBox = /\d+ \d+ (\d+) (\d+)/;
    const [, viewBoxWidth, viewBoxHeight] = viewBox
      .match(regexViewBox)
      .map((item) => Number.parseInt(item, 10));

    const width = viewBoxWidth - (margin.left + margin.right) * 2;
    const height = viewBoxHeight - (margin.top + margin.bottom);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.renter))
      .range([0, width])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.Number) + 100])
      .range([height, 0])
      .nice();

    // xAxis
    svg
      .append("g")
      .classed("xAxis", true)
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale));
    // yAxis
    svg
      .append("g")
      .classed("yAxis", true)
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));

    var rects = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    rects
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.Number))
      .attr("x", (d) => xScale(d.renter))
      .attr("y", (d) => yScale(d.Number))
      .attr("class", "rectangle")
      .attr("fill", (d) => d.color)
      .on("mouseover", (d, e) => {
        svg
          .append("text")
          .attr("x", xScale(e.renter) + margin.left + 25)
          .attr("y", yScale(e.Number) + margin.left -5 )
          .attr("class", "renter-number")
          .attr("fill", e.color)
          .html(e.Number);
      })
      .on("mouseout", () => {
        svg.select(".renter-number").remove();
      });
  });
  return (
    <main>
      <section id="renter-types-section"></section>
    </main>
  );
};
