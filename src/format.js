function formatDueDate(dueDate) {
    if (!dueDate) {
        return 'No Due Date';
    }

    const dateObject = new Date(dueDate);
    return dateObject.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

export { formatDueDate }
