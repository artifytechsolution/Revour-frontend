"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const TAB_ID = Date.now().toString();

    // Register tab
    const registerTab = () => {
      let openTabs = JSON.parse(localStorage.getItem("openTabs") || "[]");
      openTabs.push(TAB_ID);
      localStorage.setItem("openTabs", JSON.stringify(openTabs));
    };

    // Unregister tab
    const unregisterTab = () => {
      let openTabs = JSON.parse(localStorage.getItem("openTabs") || "[]");
      openTabs = openTabs.filter((id: string) => id !== TAB_ID);
      localStorage.setItem("openTabs", JSON.stringify(openTabs));

      // If no tabs left, clear everything
      if (openTabs.length === 0) {
        localStorage.clear();
      }
    };

    registerTab();
    window.addEventListener("beforeunload", unregisterTab);

    // Cleanup on unmount
    return () => {
      unregisterTab();
      window.removeEventListener("beforeunload", unregisterTab);
    };
  }, []);
  const route = useRouter();
  useEffect(() => {
    route.push("/search");
  }, []);
}
