import React, { useRef, useEffect } from 'react';
import styles from './Viewer.module.css';

interface ScrollTitleProps {
    title: string;
}

function ScrollTitle({ title }: ScrollTitleProps) {
    const titleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const textElement = titleRef.current;
        if (textElement !== null) {
            if (textElement.scrollWidth > textElement.clientWidth) {
                const translateValue = -(textElement.scrollWidth - textElement.clientWidth + 10) + 'px';
                textElement.style.setProperty('--translateX', translateValue);
                textElement.classList.add(styles.scroll_text);
            } else {
                textElement.style.setProperty('--translateX', '0px');
                textElement.classList.remove(styles.scroll_text);
            }
        }
    }, [title, titleRef]);

    return (
        <p ref={titleRef} className={styles.scrollText}>
            {title}
        </p>
    );
}

export default ScrollTitle;
