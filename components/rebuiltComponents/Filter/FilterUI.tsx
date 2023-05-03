import React, { useEffect, useState } from 'react';
import {
	useFilterState,
	useFilterStateUpdate,
} from '../../contexts/RebuiltFilterStateProvider';
import TagItem from './TagItem';

function FilterUI() {
	const filterState = useFilterState();
	const setFilterState = useFilterStateUpdate();

	const [search, setSearch] = useState('');
	const [tags, setTags] = useState<string[]>([]);

	const globalDisable = false;

	const testArray = [
		'programming',
		'coding',
		'photography',
		'editing',
		'digital',
		'football',
		'soccer',
		'sports',
		'healthy',
		'lifestyle',
		'nutrition',
		'fitness',
		'music',
		'piano',
		'classical',
		'jazz',
		'travel',
		'adventure',
		'explore',
		'culture',
		'fashion',
		'style',
		'trends',
		'accessories',
		'art',
		'painting',
		'sculpture',
		'exhibit',
		'gallery',
		'cooking',
		'recipes',
		'baking',
		'desserts',
		'cuisine',
		'pets',
		'dogs',
		'cats',
		'animals',
		'history',
		'politics',
		'world',
		'current events',
		'beauty',
		'skincare',
		'makeup',
		'haircare',
		'movies',
		'films',
		'cinema',
		'horror',
		'comedy',
		'books',
		'reading',
		'novels',
		'literature',
		'gaming',
		'video games',
		'board games',
		'strategy',
		'business',
		'finance',
		'investing',
		'entrepreneurship',
		'yoga',
		'meditation',
		'mindfulness',
		'wellness',
		'nature',
		'environment',
		'conservation',
		'wildlife',
		'science',
		'technology',
		'innovation',
		'research',
		'parenting',
		'family',
		'kids',
		'education',
		'photography',
		'landscape',
		'portrait',
		'nature',
		'design',
		'web',
		'graphic',
		'UI/UX',
		'marketing',
		'advertising',
		'branding',
		'PR',
		'basketball',
		'NBA',
		'college',
		'hoops',
		'DIY',
		'crafts',
		'home',
		'decor',
		'language',
		'linguistics',
		'translation',
		'culture',
		'cars',
		'automotive',
		'racing',
		'classics',
		'outdoors',
		'camping',
		'hiking',
		'fishing',
		'food',
		'restaurants',
		'reviews',
		'critiques',
		'fitness',
		'training',
		'workout',
		'strength',
		'fishing',
		'angling',
		'lures',
		'reels',
		'beverages',
		'coffee',
		'tea',
		'cocktails',
		'astrology',
		'horoscopes',
		'zodiac',
		'predictions',
		'furniture',
		'home',
		'interior',
		'decor',
		'finance',
		'banking',
		'credit',
		'loans',
		'law',
		'legal',
		'justice',
		'court',
		'science fiction',
		'fantasy',
		'dystopian',
		'utopian',
		'architecture',
		'design',
		'buildings',
		'structures',
		'environment',
		'climate change',
		'sustainability',
		'green',
		'fashion',
		'runway',
		'models',
		'luxury',
		'health',
		'wellness',
		'mental health',
		'therapy',
		'technology',
		'gadgets',
		'smartphones',
		'computers',
	];

	const onChangeCallback = (e: any) => {
		const { checked, name } = e.target;

		setFilterState((prev) => {
			if (checked) {
				return [...prev, name];
			} else {
				return prev.filter((tag) => tag !== name);
			}
		});
	};

	useEffect(() => {
		console.log('filterState', filterState);
		setTags(testArray);
	}, [filterState]);

	return (
		<div className='flex h-full w-full flex-col gap-2 p-6'>
			<div className='h-1/2 w-full rounded bg-emerald-500 p-6'>
				<div className='flex max-h-full w-full flex-row flex-wrap gap-2'>
					<div className='h-1/6 w-full'>
						<input
							type='text'
							className='h-full w-full rounded bg-gray-800/50 p-2'
							placeholder='Search...'
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</div>
					{tags.map((tag, index) => {
						return (
							(tag.includes(search) ||
								search === '' ||
								filterState.includes(tag)) && (
								<TagItem
									tag={tag}
									index={index}
									globalDisable={globalDisable}
									onChangeCallback={onChangeCallback}
								/>
							)
						);
					})}
				</div>
			</div>
			<div className='h-1/4 w-full rounded bg-amber-500' />
			<div className='h-1/4 w-full rounded bg-indigo-500' />
		</div>
	);
}

export default FilterUI;
