    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast-success');

    // Helper function to toggle errors
    function setError(id, isError, customMessage = null) {
      const input = document.getElementById(id) || document.getElementsByName(id)[0];
      const errorSpan = document.getElementById(`${id}-error`);
      
      if (isError) {
        input.setAttribute('data-error', 'true');
        input.setAttribute('aria-invalid', 'true');
        errorSpan.classList.remove('hidden');
        if (customMessage) errorSpan.textContent = customMessage;
      } else {
        input.removeAttribute('data-error');
        input.setAttribute('aria-invalid', 'false');
        errorSpan.classList.add('hidden');
      }
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop page reload
      let isValid = true;

      // Validate First Name
      const firstName = document.getElementById('first-name');
      if (!firstName.value.trim()) {
        setError('first-name', true);
        isValid = false;
      } else {
        setError('first-name', false);
      }

      // Validate Last Name
      const lastName = document.getElementById('last-name');
      if (!lastName.value.trim()) {
        setError('last-name', true);
        isValid = false;
      } else {
        setError('last-name', false);
      }

      // Validate Email (Native browser regex check via validity.valid)
      const email = document.getElementById('email');
      if (!email.value.trim()) {
        setError('email', true, 'This field is required');
        isValid = false;
      } else if (!email.validity.valid) {
        setError('email', true, 'Please enter a valid email address');
        isValid = false;
      } else {
        setError('email', false);
      }

      // Validate Query Type (Radio group)
      const queryType = document.querySelector('input[name="query-type"]:checked');
      if (!queryType) {
        document.getElementById('query-error').classList.remove('hidden');
        isValid = false;
      } else {
        document.getElementById('query-error').classList.add('hidden');
      }

      // Validate Message
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        setError('message', true);
        isValid = false;
      } else {
        setError('message', false);
      }

      // Validate Consent Checkbox
      const consent = document.getElementById('consent');
      if (!consent.checked) {
        document.getElementById('consent-error').classList.remove('hidden');
        isValid = false;
      } else {
        document.getElementById('consent-error').classList.add('hidden');
      }

      // On Success
      if (isValid) {
        form.reset(); // Clear the form
        
        // Show the toast message
        toast.classList.remove('opacity-0', 'pointer-events-none');
        
        // Hide the toast after 4 seconds
        setTimeout(() => {
          toast.classList.add('opacity-0', 'pointer-events-none');
        }, 4000);
      }
    });
