export const maincontainer = {
    enter: {
        opacity: 0,
        y: 10
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0
    }
}
export const mainheader = {
    enter: {
        height: '100%',
        textAlign: 'center',
    },
    animate: {
        height: 'auto',
        textAlign: 'left'
    }
}
export const mainheadertext = {
    enter: {
        left: 'auto',
    },
    animate: {
        left: '40px',
        y: 0,
        textShadow: '0 0px 0 #F7D6CF',
        color: 'white'
    }
}