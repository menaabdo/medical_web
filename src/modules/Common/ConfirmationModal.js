import { Button, Modal } from "antd";
import React from "react";

function ConfirmationModal({ open, onCancel }) {
	return (
		<Modal
			title=""
			width={480}
			footer={[null]}
			open={open.status}
			onCancel={onCancel}
			className="text-center">
			{open.icon ? <img src={open.icon} alt="status-img" /> : <></>}
			<div className={`f-rubik-24px fw-500 my-2`}>{open.title}</div>

			{open.additionalFields}
			<div className="text-center mt-4">
				{open?.buttons?.map((button, index) => {
					return (
						<Button
							onClick={button.onClick}
							className={index === 0 ? "btn-primary-lg" : "btn-text-lg"}>
							{button.name}
						</Button>
					);
				})}
			</div>
		</Modal>
	);
}

export default ConfirmationModal;
