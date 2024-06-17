import React, { useState } from 'react';
import { useFilter } from '../Contexts/FilterStateProvider';
import TagItem from './TagItem';
import useTags from './hooks/useTags';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingAnim from '../utils/LoadingAnimDismount';

function FilterUI() {
    const { filter, setFilter } = useFilter();
    const { tags, isLoading, isError } = useTags();

    const [search, setSearch] = useState('');
    const globalDisable = isLoading;

    const onChangeCallback = (e: any) => {
        const { checked, name } = e.target;

        setFilter((prev) => {
            if (checked) {
                return [...prev, name];
            } else {
                return prev.filter((tag) => tag !== name);
            }
        });
    };

    return (
        <div className="s flex h-full w-full flex-col gap-2 p-6">
            <div className="h-full w-full rounded bg-blue-800/25 p-6">
                <div className="flex max-h-full w-full flex-row flex-wrap gap-2 overflow-scroll">
                    <div className="h-1/6 w-full">
                        <input
                            type="text"
                            className="h-full w-full rounded bg-indigo-800/25 p-2"
                            placeholder="Search..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                    <AnimatePresence mode="wait">
                        {isLoading && (
                            <motion.div key="loader" className="self-center">
                                <LoadingAnim />
                            </motion.div>
                        )}
                        {isError && <div>Error loading tags.</div>}
                        {tags &&
                            (tags.sort().map((tag: string, index: number) => {
                                return (
                                    (tag.includes(search) ||
                                        search === '' ||
                                        filter.includes(tag)) && (
                                        <TagItem
                                            tag={tag}
                                            index={index}
                                            globalDisable={globalDisable}
                                            onChangeCallback={onChangeCallback}
                                            isInFilter={filter.includes(tag)}
                                        />
                                    )
                                );
                            }))
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default FilterUI;
