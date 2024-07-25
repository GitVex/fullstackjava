import { artist, tag, track } from '@prisma/client';

type TItem = track & { artist: artist, tags: tag[] }

export default TItem;