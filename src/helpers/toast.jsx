const Toast = (text) => {
    return text && window.M.toast({html:text})
}

export default Toast