function formatdue(due) {
    if (!due) {
        return '';
    }

    const dateObject = new Date(due);
    return dateObject.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export { formatdue }
