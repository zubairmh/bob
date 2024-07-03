"use client";
import Mainheader from "@/components/Mainheader";
import Maincontent from "@/components/Maincontent";



export default function Home() {


  return (
    <div className=" text-black flex min-h-screen flex-col overflow-hidden ">
      <Mainheader />
      <Maincontent />
  
    </div>
  );
}
