'use client';

import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';

import Dropdown from '../Dropdown/Dropdown';

import { VehicleMake } from '@/shared/types/vehicleMakeType';

const VehicleMakesDropdown = ({ setSelectedOption }: { setSelectedOption: (option: number) => void }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedMake, setSelectedMake] = useState('Select Make');
	const [makes, setMakes] = useState<VehicleMake[]>([]);

	const fetchVehicleMakes = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/GetMakesForVehicleType/car?format=json`
			);

			return response.data;
		} catch (error) {
			console.error('Error fetching vehicle makes:', error);

			throw error;
		}
	};

	const handleSelectOption = (option: VehicleMake) => {
		setSelectedMake(option.MakeName);
		setSelectedOption(option.MakeId);
		setIsOpen(false);
	};

	useEffect(() => {
		fetchVehicleMakes().then(data => {
			setMakes(data.Results);
		});
	}, []);

	return (
		<Dropdown isDropdownOpen={isOpen} selectedOption={selectedMake}>
			<Suspense fallback={<h2>Loading...</h2>}>
				{makes.map(data => (
					<div
						key={data.MakeId}
						onClick={() => handleSelectOption(data)}
						className="px-4 py-2 cursor-pointer hover:bg-gray-100"
					>
						{data.MakeName}
					</div>
				))}
			</Suspense>
		</Dropdown>
	);
};

export default VehicleMakesDropdown;
