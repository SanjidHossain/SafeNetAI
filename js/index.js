// Initialize EmailJS with your User ID
emailjs.init("user_XXXXXXXXXXXX"); // Replace with your actual EmailJS User ID

// Add event listener for the form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Service and Template IDs from your EmailJS account
    const serviceID = "service_h8k0jlp"; // Replace with your EmailJS Service ID
    const templateID = "template_xxxxxx"; // Replace with your EmailJS Template ID

    // Get form values
    const templateParams = {
        user_name: document.getElementById('name').value,
        user_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send the email
    emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
            alert("Email sent successfully!");
            console.log("SUCCESS!", response.status, response.text);
        })
        .catch((error) => {
            alert("Failed to send email. Please try again.");
            console.error("FAILED...", error);
        });
});