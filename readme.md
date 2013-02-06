# Inline Editing Jquery Plugin

__Usage:__ Simply have an element with data-toggle="inline-editing" and data-url="http://yourserver.com/endpoint" like this.

    <form data-toggle="inline-editing" data-url="http://...">
        
    </form>

If you change the value of a form element inside the main element, the plugin will automatically send a JSON payload.

This works for the following form elements: `<input type="text">`, `<textarea>`, `<select>`, `<select multiple>`, `<input type="radio">`, `<input type="checkbox">`

