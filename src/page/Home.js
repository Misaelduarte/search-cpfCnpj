import React from "react";
import { ListProcessTable } from "../components/ListProcessTable";
import { Search } from "../components/Search";

function Home() {
  return (
    <div className="container items-center justify-center m-auto">
      <Search />
      <ListProcessTable />
    </div>
  );
}

export default Home;
