import React from "react";
import active from "@assets/icons/active-circle.svg";
function ProgressDots({ numberOfDots, activeIndx }) {
	const dotsArray = new Array(numberOfDots).fill("");
	return (
		<ol class="steplist">
			{dotsArray.map((dot, indx) => (
				<>
					{activeIndx - 1 === indx ? (
						<li className="active">
							<div className="my-2"> {indx + 1}</div>
						</li>
					) : (
						<li>
							<div className="my-2"> {indx + 1}</div>
						</li>
					)}
				</>
			))}
		</ol>
	);
}

export default ProgressDots;
