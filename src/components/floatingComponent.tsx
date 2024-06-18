'use client';
//need to add this line since all components in Next.js are server components by default
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function FloatingMenu() {
  // const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [childDropdown, setChildDropdown] = useState(false);
  const [pinned, setPinned] = useState(false);
  const currentPath = usePathname();

  function clickHome() {
    if (currentPath !== '/') {
      window.location.replace('/');
    } else {
      window.scroll({ top: 0, behavior: "smooth" })
    }
  }

  function clickStrategies() {
    if (currentPath !== '/Strategies') {
      window.location.replace('Strategies');
    } else {
      window.scroll({ top: 0, behavior: "smooth"});
    }
  }

  function clickScoringSystem() {
    if (currentPath !== '/ScoringSystem') {
      window.location.replace('/ScoringSystem');
    } else {
      window.scroll({ top: 0, behavior: "smooth" })
    }
  }

  function clickCalculator() {
    if (currentPath !== '/BalatroCalculator') {
      window.location.replace('/BalatroCalculator');
    } else {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }
  function showDropdown() {
    return (
      <ul className={`z-50 w-[150px] h-content absolute top-20 bg-white ${dropdown || pinned ? "block" : "hidden"} dropdownUl`}
      onMouseEnter={() => {setChildDropdown(true)}}
      onMouseLeave={() => {setChildDropdown(false)}}>
        <p className="z-100 pb-3 break-words">Coming Soon!™</p>
        <p className="z-100 pb-3 break-words">They're hard to code</p>
        <p className="z-100 pb-3 break-words">Send help</p>
      </ul>
    )
  }
  return (
    <>
      <div className="flex z-50 h-20 w-full bg-white sticky top-0 floatingNavigator">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-around items-center h-full">
                <div className="text-black cursor-pointer home"
                  onClick = {clickHome}>
                  Home
                </div>
                <div className="h-20 flex items-center text-black cursor-pointer about"
                  onClick = {clickStrategies}>
                  Strategies
                </div>
                <div className="h-20 flex items-center text-blue-600 cursor-pointer dynamicList"
                  onClick={clickScoringSystem}>
                  Scoring System
                </div>
                <div className="h-20 flex items-center text-red-600 cursor-pointer staticList"
                  onClick={clickCalculator}>
                  Balatro Calculator
                </div>
                <div className="h-20 flex items-center text-slate-600 cursor-pointer relative z-50 dropDown"
                  // onClick={() => { setPinned(!pinned) }}
                  onMouseEnter={() => { setDropdown(true) }}
                  onMouseLeave={()=> { setDropdown(false) }}>
                  {"Jokers"}
                  <span className={`visibility ${pinned ? 'visible': 'invisible'} z-100`}>📌</span>
                  {dropdown || pinned ? showDropdown() : null}
                </div>
              </div>
          </div>
        </div>
    </>
  )
}