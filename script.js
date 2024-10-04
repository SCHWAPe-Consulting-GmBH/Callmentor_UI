document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    // Load questions from input.json
    fetch('input.json')
        .then(response => response.json())
        .then(data => {
            for (const [topic, questions] of Object.entries(data)) {
                // Create a topic header as a clickable rectangle
                const topicHeader = document.createElement('div');
                topicHeader.classList.add('topic');
                topicHeader.innerText = topic;

                // Create a container for questions under this topic
                const questionContainer = document.createElement('div');
                questionContainer.classList.add('questions');

                questions.forEach(question => {
                    // Create the question text
                    const questionElement = document.createElement('p');
                    questionElement.innerText = question;

                    // Create a textarea for the answer
                    const textarea = document.createElement('textarea');
                    textarea.setAttribute('data-topic', topic);
                    textarea.setAttribute('data-question', question);

                    // Append question and textarea to the container
                    questionContainer.appendChild(questionElement);
                    questionContainer.appendChild(textarea);
                });

                // Append topic and questions to the main content
                content.appendChild(topicHeader);
                content.appendChild(questionContainer);

                // Toggle the visibility of the questions when the topic header (rectangle) is clicked
                topicHeader.addEventListener('click', () => {
                    questionContainer.style.display = questionContainer.style.display === 'block' ? 'none' : 'block';
                });
            }
        });

    // Export logic
    const exportData = () => {
        const answers = {};
        document.querySelectorAll('textarea').forEach(textarea => {
            const topic = textarea.getAttribute('data-topic');
            const question = textarea.getAttribute('data-question');
            const answer = textarea.value;

            if (!answers[topic]) {
                answers[topic] = [];
            }

            answers[topic].push({ question, answer });
        });

        // Create a blob from the data and trigger a download
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(answers, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', 'output.json');
        downloadAnchor.click();
    };

    // Add export event to both buttons
    document.getElementById('exportTop').addEventListener('click', exportData);
    document.getElementById('exportBottom').addEventListener('click', exportData);
});
