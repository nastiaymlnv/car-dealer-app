'use client';

import { useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';

import { years } from '@/shared/utils/getYears';

const ModelYearDropdown = ({ setSelectedOption }: { setSelectedOption: (option: string) => void }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedYear, setSelectedYear] = useState('Select Year');

	const handleSelectOption = (year: string) => {
		setSelectedYear(year);
		setSelectedOption(year);
		setIsOpen(false);
	};

	return (
		<Dropdown isDropdownOpen={isOpen} selectedOption={selectedYear}>
			{years.map(year => (
				<div
					key={year}
					onClick={() => handleSelectOption(year)}
					className="px-4 py-2 cursor-pointer hover:bg-gray-100"
				>
					{year}
				</div>
			))}
		</Dropdown>
	);
};

export default ModelYearDropdown;
