import "./app.css";

import Dashboard from "./Components/Dashboard";
import PartyVoteTable from "./Components/PartyTable";
import VoteTable from "./Components/VoteTable";

function App() {
  return (
    <>
      {/* <Dashboard/> */}
      <VoteTable />
      <PartyVoteTable />
    </>
  );
}

export default App;
