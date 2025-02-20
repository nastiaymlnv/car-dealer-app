'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

interface DropdownProps {
	isDropdownOpen: boolean;
	selectedOption: string;
	children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ isDropdownOpen, selectedOption, children }) => {
	const [isOpen, setIsOpen] = useState(isDropdownOpen);

	useEffect(() => {
		setIsOpen(isDropdownOpen);
	}, [isDropdownOpen, selectedOption]);

	return (
		<div className="text-left w-[300px]">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full border border-gray-300 px-4 py-2 text-left rounded"
			>
				{selectedOption}
			</button>

			{isOpen && (
				<div className="w-full max-h-[400px] mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg overflow-y-auto">
					{children}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
