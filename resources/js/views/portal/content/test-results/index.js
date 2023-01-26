import ReactDOM from "react-dom"
import React from "react"

import TestResults from "./test-results"
import InitializePrototypes from "../../../../common/prototypes";
InitializePrototypes();

const rootEl = document.getElementById("react-test-results")

rootEl && ReactDOM.render(
	<TestResults
		customerID={window.customerHub}
	/>
    ,rootEl)