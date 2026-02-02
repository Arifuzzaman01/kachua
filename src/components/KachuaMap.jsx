"use client";
import React, { useState } from "react";
import { unionsData } from "../data/unions";

const KachuaMap = () => {
  const [activeUnion, setActiveUnion] = useState(null);

  const offsets = {
    pathair: "translate(10, 0)",
    bitara: "translate(11, 117)",
    sachar: "translate(132, 69)",
    palakhal: "translate(15, 177)",
    "sahadenpur paschim": "translate(103, 160)",
    "uttar kachua": "translate(183, 147)",
    kadla: "translate(45, 266)",
    "dakshin kachua": "translate(180, 240)",
    karaia: "translate(178, 288)",
    "uttat gohat": "translate(310, 289)",
    "dakashin gohat": "translate(279, 360)",
    ashrafpur: "translate(361, 390)",
  };

  return (
    <div className="relative flex flex-col items-center p-5 bg-gray-50 min-h-screen relative">
      <h1 className="text-2xl font-bold mb-8 text-slate-800">
        কচুয়া ইন্টারেক্টিভ ম্যাপ
      </h1>

      <div className=" w-full max-w-5xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="fixed top-10 right-20 md:top-28 md:right-32 z-50 pointer-events-none">
          {activeUnion ? (
            <div className="w-64 bg-white/95 backdrop-blur shadow-md rounded-xl border border-gray-600 p-2.5 md:p-5 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
              <h2 className=" md:text-lg font-bold border-b md:pb-2 mb-3 text-emerald-600">
                {activeUnion.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                মোট ভোটার:{" "}
                <span className="font-bold text-black">
                  {activeUnion.totalVoters.toLocaleString()}
                </span>
              </p>

              <div className="space-y-3 ">
                {Object.entries(activeUnion.groups).map(([key, group]) => (
                  <div key={key}>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 mb-1 ">
                      <span>{group.label}</span>
                      <span>{group.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full  bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`${group.color} h-full`}
                        style={{
                          width: `${(group.count / activeUnion.totalVoters) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-64 p-4 bg-gray-100/50 rounded-xl border border-dashed border-gray-300 text-center text-gray-400 text-sm mt-12">
              ইউনিয়নের বিস্তারিত দেখতে মাউস রাখুন
            </div>
          )}
        </div>

        <svg viewBox="0 0 600 600" className="w-full h-auto mt-28 md:mt-0">
          {unionsData.map((union) => (
            <g key={union.id} transform={offsets[union.id] || "translate(0,0)"}>
              <path
                key={union.id}
                d={union.pathData}
                style={{ fill: union.colorCode || "#E2E8F0" }}
                className="stroke-white stroke-[1.5] hover:fill-emerald-400 transition-all duration-300 cursor-pointer group "
                onMouseEnter={() => setActiveUnion(union)}
                onMouseLeave={() => setActiveUnion(null)}
              />

              <text
                x="70"
                y="44"
                fontSize="8"
                fontWeight="bold"
                textAnchor="middle"
                className="fill-slate-600 z-50  select-none group-hover:fill-slate-800"
              >
                {union.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* লেজেন্ড */}
      <div className="mt-8 flex gap-6 bg-white p-4 rounded-full shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span> Group A
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Group B
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span> Group C
        </div>
      </div>
    </div>
  );
};

export default KachuaMap;
