const Alert = (text = 'Something went wrong', closeAfter = 3000) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-container alert-opened`;
    alertDiv.innerText = text;
    document.body.append(alertDiv);

    setTimeout(() => {
        alertDiv.className = `alert-container alert-closed`;
        alertDiv.addEventListener('animationend', () => {
            alertDiv.remove();
        });
    }, closeAfter);
}
