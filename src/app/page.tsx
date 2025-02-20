'use client';

import Link from 'next/link';
import { useState } from 'react';

import VehicleMakesDropdown from '@/shared/components/VehicleMakesDropdown/VehicleMakesDropdown';
import ModelYearDropdown from '@/shared/components/ModelYearDropdown/ModelYearDropdown';

export default function Home() {
	const [selectedType, setSelectedType] = useState<number | null>(null);
	const [selectedYear, setSelectedYear] = useState<string | null>(null);

	const isNextBtnEnabled = selectedType && selectedYear;

	return (
		<div className={`flex justify-between h-full`}>
			<div className={`flex w-[70%] justify-between flex-wrap`}>
				<div className={`flex flex-col gap-2`}>
					<p>Select type:</p>
					<VehicleMakesDropdown setSelectedOption={setSelectedType} />
				</div>
				<div className={`flex flex-col gap-2`}>
					<p>Select year:</p>
					<ModelYearDropdown setSelectedOption={setSelectedYear} />
				</div>
			</div>
			<div>
				<Link
					href={isNextBtnEnabled ? `result/${selectedType}/${selectedYear}` : `#`}
					className={`px-6 py-2 rounded text-white transition ${
						isNextBtnEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
					}`}
				>
					Next
				</Link>
			</div>
		</div>
	);
}
