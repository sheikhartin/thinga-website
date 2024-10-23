import React from "react";
import { Helmet } from "react-helmet";

import TopRanksTable from "../components/TopRanksTable";

const TopRanksPage = () => (
  <>
    <Helmet>
      <title>Top Ranks | Thinga</title>
    </Helmet>

    <section className="section mx-auto">
      <TopRanksTable />
    </section>
  </>
);

export default TopRanksPage;
