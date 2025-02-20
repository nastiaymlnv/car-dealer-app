import axios from 'axios';
import { Suspense } from 'react';

import { Results } from '@/shared/types/resultsType';
import { years } from '@/shared/utils/getYears';

const fetchMakes = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/GetMakesForVehicleType/car?format=json`
		);

		return response.data.Results.filter((make: Results) => make.Make_ID).map((make: Results) =>
			make.Make_ID.toString()
		);
	} catch (error) {
		console.error('Error fetching makes:', error);

		return [];
	}
};

export async function generateStaticParams() {
	const makeIds = await fetchMakes();

	const paths = makeIds.flatMap((makeId: string) => years.map(year => ({ makeId, year })));

	return paths;
}

export default async function ResultPage({ params }: { params: { makeId: string; year: string } }) {
	const { makeId, year } = params;

	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
	);

	const results = response.data;

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<p>
				By the request of
				<span className="font-bold"> &quot;{results.SearchCriteria}&quot; </span>
				found
				<span className="font-bold"> {results.Count} </span>
				items
			</p>

			<div className="overflow-x-auto">
				<div className="max-h-[90vh] overflow-y-auto border border-gray-300 rounded">
					<table className="w-full border-collapse">
						<thead className="bg-gray-200 sticky top-0 z-10">
							<tr>
								<th className="border border-gray-400 px-4 py-2">Make ID</th>
								<th className="border border-gray-400 px-4 py-2">Make Name</th>
								<th className="border border-gray-400 px-4 py-2">Model ID</th>
								<th className="border border-gray-400 px-4 py-2">Model Name</th>
							</tr>
						</thead>
						<tbody>
							{results.Results.map((item: Results, index: number) => (
								// using index as key because the data doesn't have unique key
								<tr key={index} className="hover:bg-gray-100">
									<td className="border border-gray-400 px-4 py-2">{item.Make_ID}</td>
									<td className="border border-gray-400 px-4 py-2">{item.Make_Name}</td>
									<td className="border border-gray-400 px-4 py-2">{item.Model_ID}</td>
									<td className="border border-gray-400 px-4 py-2">{item.Model_Name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Suspense>
	);
}
