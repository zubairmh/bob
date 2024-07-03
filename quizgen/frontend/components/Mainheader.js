"use client";
import Image from "next/image";

import Link from "next/link";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ weight: "700", subsets: ["latin"] });
const inter2 = Inter({ weight: "500", subsets: ["latin"] });

import { Button } from "@/components/ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Mainheader({ children }) {
  let paths = {
    "/": "Home",
    "/about": "About",
  };

  return (
    <div className=" flex flex-row p-3 border-slate-200 border-b-2 gap-10 items-center justify-between text-black">
      <img className="h-16" src="/bob.jpg"/>
      <div className="text-3xl text-black">Bank of Baroda</div>
    
    </div>
  );
}
