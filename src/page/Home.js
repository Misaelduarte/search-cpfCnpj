import React from "react";
import ProcessDataModal from "../components/ProcessDataModal";
import { ListProcessTable } from "../components/ListProcessTable";
import { Search } from "../components/Search";

function Home() {
  return (
    <div className="container items-center justify-center m-auto">
      <Search />
      <ListProcessTable />
      {/* <ProcessDataModal /> */}
    </div>
  );
}

export default Home;
