import React from "react";

export default function Header({ main, title }) {
  return (
    <h1
      className={`${main ? "text-5xl font-bold" : "text-3xl"} text-center p-4`}
    >
      {title}
    </h1>
  );
}
