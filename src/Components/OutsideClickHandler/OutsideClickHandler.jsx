import { useEffect, useRef } from 'react';

const useOutsideAlerter = (ref, run) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                run();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, run]);
};



const OutsideClickHandler = (props) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.onClickOutSide);
    return <div ref={wrapperRef}>{props.children}</div>;
};

export default OutsideClickHandler;
