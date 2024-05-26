import { track } from '@prisma/client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLoadVideoInLongestPausedPlayer } from '../utils/AddHandler';
import NotificationButton from '../utils/NotificationButton';
import ScrollTitle from './ScrollTitle';

interface ListItemProps {
    item: track & { tags: any };
}

function ListItem({ item }: ListItemProps) {
    const loadVideo = useLoadVideoInLongestPausedPlayer();
    const [showTags, setShowTags] = useState(false);

    return (
        <div
            className="flex flex-row items-center gap-2 rounded-lg bg-indigo-600/10 p-2 text-sm duration-100 hover:border-l-8"
            //@ts-ignore
            style={{ 'border-inline-color': item.color }}
            onMouseEnter={() => setShowTags(true)}
            onMouseLeave={() => setShowTags(false)}
        >
            <div className="flex w-3/5 flex-1 flex-col">
                <div className="w-full truncate" style={{ maxWidth: '100%' }}>
                    <ScrollTitle title={item.title} />
                    <div>
                        <p className="truncate text-slate-600">
                            <em>{!showTags && item.artist}</em>
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showTags ? 1 : 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <p className="truncate text-slate-600">
                            <em>
                                {showTags &&
                                    //@ts-ignore
                                    item.tags.map((tag, index) => (
                                        <span key={tag.id}>
                                            {tag.name}
                                            {index < item.tags.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                            </em>
                        </p>
                    </motion.div>
                </div>
            </div>
            <NotificationButton
                id={item.id}
                color={item.color}
                luminance={item.luminance}
                onClick={() => navigator.clipboard.writeText(item.url)}
            >
                Copy
            </NotificationButton>
            <NotificationButton
                id={item.id}
                color={item.color}
                luminance={item.luminance}
                onClick={() => loadVideo(item.url)}
            >
                Add
            </NotificationButton>
        </div>
    );
}

export default ListItem;
